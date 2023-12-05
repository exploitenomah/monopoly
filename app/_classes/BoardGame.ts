import Player from "./Player"
import GameCard from "./GameCard"
import Space from "./Space"
import HousingProperty from "./HousingProperty"
import StationProperty from "./StationProperty"
import UtilityProperty from "./UtilityProperty"
import generateChanceCards from "../_data/cards/chance"
import generateCommunityChestCards from "../_data/cards/communityChest"
import LineOne from "../_lines/LineOne"
import LineTwo from "../_lines/LineTwo"
import LineThree from "../_lines/LineThree"
import LineFour from "../_lines/LineFour"
import { PlayerDetail, GetOutOfJailChoice } from "../types"
import Go from "../_lines/GO"
import GoToJail from "../_lines/GoToJail"
import Jail from "../_lines/Jail"
import FreeParking from "../_lines/FreeParking"

type Line = (HousingProperty | UtilityProperty | StationProperty | Space)[]
export const chanceTiles = [7, 22, 36]
export const communityChestTiles = [2, 17, 33]

export default class BoardGame {
  public Go: Space = Go
  public GoToJail: Space = GoToJail
  public Jail: Space = Jail
  public FreeParking: Space = FreeParking
  public name: string
  public id: string
  public password: string
  public players: Player[]
  public chanceCards: GameCard[]
  public communityChestCards: GameCard[]
  public runningOrder: number[] = []
  public properties: {
    1: Line
    2: Line
    3: Line
    4: Line
  } = {
    1: LineOne,
    2: LineTwo,
    3: LineThree,
    4: LineFour,
  }
  public hasSetRunningOrder: boolean = false
  public isInitialized: boolean = false
  public currentTurn?: number
  public shouldUpdateCurrentTurn: boolean = true
  public currentChanceCard: { card: GameCard; owner: number } | null = null
  public currentChestCard: { card: GameCard; owner: number } | null = null
  public positionUpForBidding?: number
  public hasHandledAdvancement?: boolean

  constructor(
    name: string,
    id: string,
    password: string,
    totalPlayers: number
  ) {
    this.name = name
    this.id = id
    this.password = password
    this.chanceCards = generateChanceCards()
    this.communityChestCards = generateCommunityChestCards()
    this.players = Array(totalPlayers)
      .fill(null)
      .map((_, idx) => new Player(idx, 1500))
  }

  public setRunningOrder(chosenStart: number) {
    if (this.hasSetRunningOrder === true) return this
    let runningOrder = []
    let start = chosenStart
    while (runningOrder.length < this.players.length) {
      runningOrder.push(start)
      if (start >= this.players.length - 1) {
        start = -1
      }
      start++
    }
    this.hasSetRunningOrder = true
    this.runningOrder = runningOrder
    return this
  }

  public initialize(players: PlayerDetail[]) {
    this.players = this.players.map((player, idx) => {
      player.name = players[idx].name
      player.color = players[idx].color
      return player
    })
    const highestRoller = [...players].sort(
      (a, b) => b.rollValue - a.rollValue
    )[0]
    const idOfPlayerWithHighestRoll = this.players.find(
      (it) => it.name === highestRoller.name
    )?.id
    this.setRunningOrder(idOfPlayerWithHighestRoll as number)
    this.players = this.players.map((player, idx) => {
      player.turn = this.runningOrder.indexOf(player.id)
      return player
    })
    this.Go.contents = this.players.map((player) => player)
    this.currentTurn = 0
    this.isInitialized = true
    return this
  }

  private updateCurrentTurn() {
    const newTurn = (this.currentTurn || 0) + 1
    if (newTurn > this.players.length - 1) this.currentTurn = 0
    else this.currentTurn = newTurn
    return this
  }

  private updateLineContents(player: Player | null) {
    if (player) {
      this.properties[1] = BoardGame.editLineContents(
        this.properties[1],
        player
      )
      this.Go = BoardGame.editSpaceContents(this.Go, player) as Space
      this.properties[2] = BoardGame.editLineContents(
        this.properties[2],
        player
      )
      this.Jail = BoardGame.editSpaceContents(this.Jail, player) as Space
      this.properties[3] = BoardGame.editLineContents(
        this.properties[3],
        player
      )
      this.FreeParking = BoardGame.editSpaceContents(
        this.FreeParking,
        player
      ) as Space
      this.properties[4] = BoardGame.editLineContents(
        this.properties[4],
        player
      )
      this.GoToJail = BoardGame.editSpaceContents(
        this.GoToJail,
        player
      ) as Space
    }
    return this
  }

  public declineToPurchase(playerId: number) {
    this.positionUpForBidding = this.players.find(
      (it) => it.id === playerId
    )?.currentPosition
    const player = this.players.find((player) => player.id === playerId)
    if (player) {
      player.hasActed = true
      player.justLandedOn = undefined
    }
    return this
  }

  public cancelBidding() {
    this.positionUpForBidding = undefined
    this.shouldUpdateCurrentTurn && this.updateCurrentTurn()
    return this
  }

  public sellToHighestBidder(playerId: number, bidPrice: number) {
    this.purchasePropertyWithBidPrice(
      playerId,
      this.positionUpForBidding as number,
      bidPrice
    )
    this.shouldUpdateCurrentTurn && this.updateCurrentTurn()
    this.positionUpForBidding = undefined
    return this
  }

  public handlePlayerAction(playerId: number) {
    const player = this.players.find((player) => player.id === playerId)
    if (player) {
      if (
        this.currentChanceCard &&
        chanceTiles.includes(player.currentPosition)
      ) {
        this.currentChanceCard.card.handleAction(this, player.id)
        if (
          !BoardGame.isGetOutOfJailFree(this.currentChanceCard?.card.content)
        ) {
          const [first, ...rest] = this.chanceCards
          this.chanceCards = [...rest, first]
        }
        this.currentChanceCard = null
      } else if (
        this.currentChestCard &&
        communityChestTiles.includes(player.currentPosition)
      ) {
        this.currentChestCard.card.handleAction(this, player.id)
        if (
          !BoardGame.isGetOutOfJailFree(this.currentChanceCard?.card.content)
        ) {
          const [first, ...rest] = this.communityChestCards
          this.communityChestCards = [...rest, first]
        }
        this.currentChestCard = null
      } else {
        if (player.currentPosition === 38) {
          player.accountBalance -= 100
        } else if (player.currentPosition === 4) {
          player.accountBalance -= 200
        } else {
          const property = BoardGame.findProperty(this, player.currentPosition)
          if (property) {
            if (property.owner === null) {
              this.buyPropertyWithDefaultPrice(player.id)
            } else {
              this.handleRentCollection(player, property)
            }
          }
        }
        if (
          this.hasHandledAdvancement === false &&
          player.hasJustAdvanced === true
        ) {
          player.hasJustAdvanced = undefined
          this.hasHandledAdvancement = undefined
          console.log(player.prevRollWasDouble)
          this.shouldUpdateCurrentTurn = !player.prevRollWasDouble
        }
      }

      player.justLandedOn = undefined
      player.hasActed = true
    }
    this.shouldUpdateCurrentTurn && this.updateCurrentTurn()
    return this
  }

  public handleLandingOnPosition(player: Player) {
    if (
      player.currentPosition !== 0 &&
      player.currentPosition !== 10 &&
      player.currentPosition !== 20 &&
      player.currentPosition !== 30
    ) {
      player.hasJustAdvanced = true
      this.hasHandledAdvancement = false
      this.shouldUpdateCurrentTurn = false
      player.hasActed = false
      player.justLandedOn = player.currentPosition
      this.currentTurn = player.turn as number
    } else {
      if (
        player.prevRollWasDouble === false ||
        player.prevRollWasDouble === undefined ||
        this.shouldUpdateCurrentTurn
      )
        this.updateCurrentTurn()
    }
  }

  private handleIsDoubleRollByCurrentTurn(isDouble?: boolean) {
    let shouldUpdateCurrentTurn = true
    this.players.forEach((player) => {
      if (player.turn === this.currentTurn) {
        shouldUpdateCurrentTurn =
          isDouble === undefined ||
          isDouble === false ||
          (player.doubleRollsCount >= 2 && isDouble) ||
          player.isInJail
        player.prevRollWasDouble =
          typeof isDouble === "boolean" ? isDouble : !shouldUpdateCurrentTurn
      }
    })
    this.shouldUpdateCurrentTurn = shouldUpdateCurrentTurn
    return this
  }

  public regressPlayer(regression: number, isDouble?: boolean) {
    let playerInQuestion: Player | undefined = undefined
    this.handleIsDoubleRollByCurrentTurn(isDouble)
    this.players.forEach((player) => {
      if (player.turn === this.currentTurn) {
        player.regress(regression, isDouble || false)
        playerInQuestion = player
      }
    })
    this.handlePlayerAfterMotion(playerInQuestion)
    return this
  }

  public advancePlayer(advancement: number, isDouble?: boolean) {
    this.handleIsDoubleRollByCurrentTurn(isDouble)
    let advancingPlayer: Player | undefined = undefined
    this.players.forEach((player) => {
      if (player.turn === this.currentTurn) {
        player.advance(advancement, isDouble || false)
        advancingPlayer = player
      }
    })
    this.handlePlayerAfterMotion(advancingPlayer)
    return this
  }

  public handlePlayerAfterMotion(player?: Player) {
    if (player) {
      if (
        [...chanceTiles, ...communityChestTiles].includes(
          (player as Player).currentPosition
        )
      ) {
        this.handleChanceOrChestLanding(player)
      }
      this.updatePlayerDataAfterMotion((player as Player).id)
      this.updateLineContents(player)
    }
  }

  public updatePlayerDataAfterMotion(playerId: number) {
    const player = this.players.find((it) => it.id === playerId)
    if (!player) return this
    if (player.currentPosition === 30) {
      this.sendPlayerToJail(player.id)
    }
    const specialTiles = [10, 20, 0]
    if (!specialTiles.includes(player.currentPosition)) {
      player.justLandedOn = player.currentPosition
      player.hasActed = false
    } else {
      this.shouldUpdateCurrentTurn && this.updateCurrentTurn()
    }
    return this
  }

  public handleRentCollection(
    player: Player,
    property: HousingProperty | StationProperty | UtilityProperty
  ) {
    if (typeof property.owner === "number" && property.owner !== player.id) {
      const rentAmount = BoardGame.calculatePropertyRent(
        property,
        Object.values(this.properties).reduce((acc, it) => [
          ...acc,
          ...it,
        ]) as any
      )
      this.players.forEach((it) => {
        if (it.id === player.id) {
          it.accountBalance -= rentAmount
        }
        if (it.id === property.owner) {
          it.accountBalance += rentAmount
        }
      })
    }
  }

  public handleChanceOrChestLanding(player: Player) {
    if (chanceTiles.includes(player.currentPosition)) {
      this.currentChanceCard = {
        card: this.chanceCards[0],
        owner: player.id,
      }
    } else {
      this.currentChestCard = {
        card: this.communityChestCards[0],
        owner: player.id,
      }
    }
  }

  public buyPropertyWithDefaultPrice(playerId: number) {
    this.players.forEach((player) => {
      if (player.id === playerId) {
        const property = BoardGame.findProperty(this, player.currentPosition)
        if (player.properties.includes(property.id)) return
        else if (property && property.owner === null) {
          if (player.accountBalance >= property.price) {
            property.owner = player.id
            property.isOwned = true
            player.accountBalance -= property.price
            player.properties.push(property.id)
          }
        }
      }
    })
    return this
  }

  public purchasePropertyWithBidPrice(
    playerId: number,
    propertyPosition: number,
    bidPrice: number
  ) {
    this.players.forEach((player) => {
      if (player.id === playerId) {
        const property = BoardGame.findProperty(this, propertyPosition)
        if (player.properties.find((it) => it === property.id)) return
        else if (property && property.owner === null) {
          if (player.accountBalance >= bidPrice) {
            property.owner = player.id
            property.isOwned = true
            player.accountBalance -= bidPrice
            player.properties.push(property.id)
          }
        }
      }
    })
    return this
  }

  public getCurrentPlayerOutOfJail(choice: GetOutOfJailChoice) {
    const currentPlayer = this.players.find(
      (it) => it.turn === this.currentTurn
    )
    if (currentPlayer) {
      this.players.forEach((player) => {
        if (player.id === currentPlayer.id) {
          switch (choice) {
            case "USE-GAMECARD":
              this.getPlayerOutOfJailWithGameCard(currentPlayer.id)
              return this
            case "PAY-50":
              player.pay50ToGetOutOfJail()
              return this
            case "ROLL-FOR-DOUBLE":
              player.rollForDoubleToGetOutOfJail()
              return this
            default:
              return this
          }
        }
      })
    }
    return this
  }

  public getPlayerOutOfJailWithGameCard(id: number) {
    this.players.forEach((player) => {
      if (player.id === id) {
        console.log(player.isInJail)
        player.isInJail =
          player.getOutOfJailCards.chance === null &&
          player.getOutOfJailCards.communityChest === null
        if (player.getOutOfJailCards.chance !== null) {
          this.chanceCards = [
            ...this.chanceCards,
            player.getOutOfJailCards.chance,
          ]
          player.getOutOfJailCards.chance = null
        } else if (player.getOutOfJailCards.communityChest !== null) {
          this.communityChestCards = [
            ...this.communityChestCards,
            player.getOutOfJailCards.communityChest,
          ]
          player.getOutOfJailCards.communityChest = null
        }
        console.log("balablue", player, "balablue")
      }
    })
    return this
  }

  public sendPrisonersToJail() {
    this.players.forEach((player) => {
      if (player.isInJail && player.currentPosition !== 10) {
        player.currentPosition = 10
        this.updateLineContents(player)
      }
    })
    return this
  }

  public sendPlayerToJail(playerId: number) {
    this.players.forEach((player) => {
      if (player.id === playerId) {
        player.currentPosition = 10
        player.isInJail = true
        this.updateLineContents(player)
      }
    })
    return this
  }

  static editLineContents(line: Line, player: Player) {
    line.forEach((property) => {
      BoardGame.editSpaceContents(property, player)
    })
    return line
  }

  static editSpaceContents(
    space: HousingProperty | UtilityProperty | StationProperty | Space,
    player: Player
  ) {
    space.contents = space.contents.filter((it) => it.id !== player.id)
    if (space.position === player.currentPosition) {
      space.contents.push(player)
    }
    return space
  }

  static calculatePropertyRent(
    property: HousingProperty | StationProperty | UtilityProperty,
    properties: (HousingProperty | StationProperty | UtilityProperty)[],
    dieValue?: number
  ) {
    if (property.type === "HOUSING")
      return HousingProperty.calculateRent(
        property as HousingProperty,
        properties as HousingProperty[]
      )
    else if (property.type === "STATION")
      return StationProperty.calculateRent(
        property as StationProperty,
        properties as StationProperty[]
      )
    else if (property.type === "UTILITY")
      return UtilityProperty.calculateRent(
        property as UtilityProperty,
        properties as UtilityProperty[],
        dieValue
      )
    else return 0
  }

  static findProperty(game: BoardGame, propertyPosition: number) {
    let property
    if (propertyPosition <= 10) {
      property = game.properties[1].find(
        (it) => it.position === propertyPosition
      )
    } else if (propertyPosition <= 20) {
      property = game.properties[2].find(
        (it) => it.position === propertyPosition
      )
    } else if (propertyPosition <= 30) {
      property = game.properties[3].find(
        (it) => it.position === propertyPosition
      )
    } else if (propertyPosition <= 40) {
      property = game.properties[4].find(
        (it) => it.position === propertyPosition
      )
    }
    return property as HousingProperty | StationProperty | UtilityProperty
  }

  public static isGetOutOfJailFree(text?: string) {
    return text?.toLowerCase() === "Get Out of Jail Free".toLowerCase()
  }

  public static revive(objectLikeBoardGame: BoardGame) {
    const {
      name,
      id,
      password,
      players,
      chanceCards,
      communityChestCards,
      runningOrder,
      properties,
      hasSetRunningOrder,
      isInitialized,
      currentTurn,
      Go,
      GoToJail,
      FreeParking,
      Jail,
      shouldUpdateCurrentTurn,
      currentChanceCard,
      currentChestCard,
      positionUpForBidding,
      hasHandledAdvancement,
    } = objectLikeBoardGame
    const revivedBoardGame = new BoardGame(name, id, password, players.length)
    revivedBoardGame.chanceCards = chanceCards.map((card) =>
      GameCard.revive(card)
    )
    revivedBoardGame.communityChestCards = communityChestCards.map((card) =>
      GameCard.revive(card)
    )
    revivedBoardGame.runningOrder = runningOrder
    revivedBoardGame.properties = {
      1: reviveProperties(properties[1]),
      2: reviveProperties(properties[2]),
      3: reviveProperties(properties[3]),
      4: reviveProperties(properties[4]),
    } as typeof revivedBoardGame.properties
    revivedBoardGame.hasSetRunningOrder = hasSetRunningOrder
    revivedBoardGame.players = players.map((player) => Player.revive(player))
    revivedBoardGame.isInitialized = isInitialized
    revivedBoardGame.currentTurn = currentTurn
    revivedBoardGame.Go = Space.revive(Go)
    revivedBoardGame.GoToJail = Space.revive(GoToJail)
    revivedBoardGame.FreeParking = Space.revive(FreeParking)
    revivedBoardGame.Jail = Space.revive(Jail)
    revivedBoardGame.positionUpForBidding = positionUpForBidding
    revivedBoardGame.shouldUpdateCurrentTurn = shouldUpdateCurrentTurn
    revivedBoardGame.currentChanceCard = currentChanceCard
      ? {
          ...currentChanceCard,
          card: GameCard.revive(currentChanceCard.card),
        }
      : currentChanceCard
    revivedBoardGame.currentChestCard = currentChestCard
      ? { ...currentChestCard, card: GameCard.revive(currentChestCard.card) }
      : currentChestCard
    revivedBoardGame.hasHandledAdvancement = hasHandledAdvancement
    return revivedBoardGame
  }
}

function reviveProperties(properties: Line) {
  return properties.map((property) => {
    switch (property.type) {
      case "HOUSING":
        return HousingProperty.revive(property as HousingProperty)
      case "STATION":
        return StationProperty.revive(property as StationProperty)
      case "UTILITY":
        return UtilityProperty.revive(property as UtilityProperty)
      default:
        return Space.revive(property as Space)
    }
  })
}
