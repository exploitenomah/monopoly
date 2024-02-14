import GameCard from "./GameCard"
import { PlayerColor } from "../types"

export default class Player {
  public turn: number | null = null
  public accountBalance: number
  public id: number
  public properties: string[]
  public mortgagedProperties: string[] = []
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
  public justLandedOn?: number
  public hasActed?: boolean
  public totalHousesOwned: number = 0
  public totalHotelsOwned: number = 0
  public hasJustAdvanced?: boolean
  public prevRollWasDouble?: boolean

  constructor(id: number, accountBalance: number) {
    this.accountBalance = accountBalance
    this.id = id
    this.properties = []
  }

  private collectSalary() {
    if (this.isBankrupt) return this
    this.accountBalance = this.accountBalance + 200
    return this
  }

  public addToAccount(value: number){
    this.accountBalance += Number(value)
    return this
  }

  public regress(count: number, isDouble: boolean) {
    const newPosition = this.currentPosition - count
    if (Math.sign(newPosition) === -1) {
      this.currentPosition = 40 - Math.abs(newPosition)
    } else {
      this.currentPosition = newPosition
    }
    return this
  }

  public advance(value: number, isDouble: boolean) {
    this.checkAndUpdateJailStatus(isDouble)
    if (this.isInJail) return this
    const newPosition = value + this.currentPosition
    if (newPosition >= 40) {
      this.currentPosition = newPosition - 40
      this.collectSalary()
    } else this.currentPosition = newPosition
    return this
  }

  private checkAndUpdateJailStatus(isDouble: boolean) {
    if (isDouble) {
      if (this.isInJail) {
        this.isInJail = false
        this.countOfTimesRolledForDoublesToGetOutOfJail = 0
        this.isRollingForDoubles = false
      } else {
        this.doubleRollsCount += 1
      }
    } else {
      if (
        this.isInJail &&
        this.countOfTimesRolledForDoublesToGetOutOfJail >= 3 &&
        this.isRollingForDoubles
      ) {
        this.countOfTimesRolledForDoublesToGetOutOfJail = 0
        this.isRollingForDoubles = false
        this.isInJail = false
      } else {
        this.doubleRollsCount = 0
        this.isRollingForDoubles = false
      }
    }
    if (this.doubleRollsCount >= 3) {
      this.isInJail = true
      this.doubleRollsCount = 0
      return this
    }
  }

  public pay50ToGetOutOfJail() {
    this.isBankrupt = this.accountBalance <= 0
    if (this.accountBalance < 50) {
      return this
    }
    this.isInJail = false
    this.accountBalance = this.accountBalance - 50
    return this
  }

  public rollForDoubleToGetOutOfJail() {
    this.isRollingForDoubles = true
    this.countOfTimesRolledForDoublesToGetOutOfJail += 1
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
      justLandedOn,
      hasActed,
      totalHousesOwned,
      totalHotelsOwned,
      hasJustAdvanced,
      prevRollWasDouble,
      mortgagedProperties = []
    } = objectLikePlayer
    const revivedPlayer = new Player(id, accountBalance)
    revivedPlayer.turn = turn
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
    revivedPlayer.properties = properties
    revivedPlayer.justLandedOn = justLandedOn
    revivedPlayer.hasActed = hasActed
    revivedPlayer.totalHousesOwned = totalHousesOwned
    revivedPlayer.totalHotelsOwned = totalHotelsOwned
    revivedPlayer.hasJustAdvanced = hasJustAdvanced
    revivedPlayer.prevRollWasDouble = prevRollWasDouble
    revivedPlayer.mortgagedProperties = mortgagedProperties
    return revivedPlayer
  }
}
