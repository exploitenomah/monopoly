import GameCard from "./GameCard"
import { PlayerColor } from "../types"

export default class Player {
  public turn: number | null = null
  public accountBalance: number
  public id: number
  public properties: string[]
  public isBankrupt: boolean = false
  public getOutOfJailCards: {
    chance: null | GameCard
    communityChest: null | GameCard
  } = {
    chance: null,
    communityChest: null,
  }
  public isInJail: boolean = false
  public currentTilePosition: number = 0
  public color: PlayerColor | null = null
  public name: string = ""

  constructor(id: number, accountBalance: number) {
    this.accountBalance = accountBalance
    this.id = id
    this.properties = []
  }

  public static revive(objectLikePlayer: Player) {
    const {
      id,
      accountBalance,
      turn,
      properties,
      isBankrupt,
      getOutOfJailCards,
      isInJail,
      currentTilePosition,
      name,
      color,
    } = objectLikePlayer
    const revivedPlayer = new Player(id, accountBalance)
    revivedPlayer.turn = turn
    revivedPlayer.properties = properties
    revivedPlayer.isBankrupt = isBankrupt
    revivedPlayer.getOutOfJailCards = getOutOfJailCards
    revivedPlayer.isInJail = isInJail
    revivedPlayer.currentTilePosition = currentTilePosition
    revivedPlayer.name = name
    revivedPlayer.color = color
    return revivedPlayer
  }
}
