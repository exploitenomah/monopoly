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

type Line = (HousingProperty | UtilityProperty | StationProperty | Space)[]

export default class BoardGame {
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
      .map((_, idx) => new Player(idx + 1, 1500))
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
