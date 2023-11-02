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
    LineOne: Line
    LineTwo: Line
    LineThree: Line
    LineFour: Line
  } = {
    LineOne,
    LineTwo,
    LineThree,
    LineFour,
  }
  public hasSetRunningOrder: boolean = false
  public isInitialized: boolean = false
  public currentTurn?: number

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
      this.properties.LineOne = BoardGame.editLineContents(
        this.properties.LineOne,
        player
      )
      this.Go = BoardGame.editSpaceContents(this.Go, player) as Space
      this.properties.LineTwo = BoardGame.editLineContents(
        this.properties.LineTwo,
        player
      )
      this.Jail = BoardGame.editSpaceContents(this.Jail, player) as Space
      this.properties.LineThree = BoardGame.editLineContents(
        this.properties.LineThree,
        player
      )
      this.FreeParking = BoardGame.editSpaceContents(
        this.FreeParking,
        player
      ) as Space
      this.properties.LineFour = BoardGame.editLineContents(
        this.properties.LineFour,
        player
      )
      this.GoToJail = BoardGame.editSpaceContents(
        this.GoToJail,
        player
      ) as Space
    }
    return this
  }

  public advancePlayer(advancement: number, isDouble: boolean) {
    let shouldUpdateCurrentTurn = true
    let advancingPlayer = null
    this.players.forEach((player) => {
      if (player.turn === this.currentTurn) {
        advancingPlayer = player
        shouldUpdateCurrentTurn =
          isDouble === false || player.doubleRollsCount >= 2 || player.isInJail
        return player.advance(advancement, isDouble)
      } else return player
    })
    advancingPlayer && this.updateLineContents(advancingPlayer)
    shouldUpdateCurrentTurn && this.updateCurrentTurn()
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
              return this
            case "PAY-500":
              player.pay500ToGetOutOfJail()
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
      LineOne: reviveProperties(properties.LineOne),
      LineTwo: reviveProperties(properties.LineTwo),
      LineThree: reviveProperties(properties.LineThree),
      LineFour: reviveProperties(properties.LineFour),
    } as typeof revivedBoardGame.properties
    revivedBoardGame.hasSetRunningOrder = hasSetRunningOrder
    revivedBoardGame.players = players.map((player) => Player.revive(player))
    revivedBoardGame.isInitialized = isInitialized
    revivedBoardGame.currentTurn = currentTurn
    revivedBoardGame.Go = Space.revive(Go)
    revivedBoardGame.GoToJail = Space.revive(GoToJail)
    revivedBoardGame.FreeParking = Space.revive(FreeParking)
    revivedBoardGame.Jail = Space.revive(Jail)
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
