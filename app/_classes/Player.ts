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
  public currentPosition: number = 0
  public color: PlayerColor | null = null
  public name: string = ""
  public doubleRollsCount: number = 0
  public isRollingForDoubles: boolean = false
  public countOfTimesRolledForDoublesToGetOutOfJail: number = 0

  constructor(id: number, accountBalance: number) {
    this.accountBalance = accountBalance
    this.id = id
    this.properties = []
  }

  private collectSalary() {
    this.accountBalance = this.accountBalance + 200
  }

  public advance(value: number, isDouble: boolean) {
    if (isDouble) this.doubleRollsCount += 1
    else this.doubleRollsCount = 0

    if (this.doubleRollsCount >= 3) {
      this.isInJail = true
      this.doubleRollsCount = 0
      return this
    }
    const newPosition = value + this.currentPosition
    if (newPosition >= 39) {
      this.currentPosition = newPosition - 39
      this.collectSalary()
    } else this.currentPosition = newPosition
    return this
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
      currentPosition,
      name,
      color,
      doubleRollsCount,
      isRollingForDoubles,
      countOfTimesRolledForDoublesToGetOutOfJail,
    } = objectLikePlayer
    const revivedPlayer = new Player(id, accountBalance)
    revivedPlayer.turn = turn
    revivedPlayer.properties = properties
    revivedPlayer.isBankrupt = isBankrupt
    revivedPlayer.getOutOfJailCards = getOutOfJailCards
    revivedPlayer.isInJail = isInJail
    revivedPlayer.currentPosition = currentPosition
    revivedPlayer.name = name
    revivedPlayer.color = color
    revivedPlayer.doubleRollsCount = doubleRollsCount
    revivedPlayer.isRollingForDoubles = isRollingForDoubles
    revivedPlayer.countOfTimesRolledForDoublesToGetOutOfJail =
      countOfTimesRolledForDoublesToGetOutOfJail
    return revivedPlayer
  }
}
