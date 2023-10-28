import GameCard from "./GameCard"

export default class Player {
  public turn: number
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

  constructor(id: number, accountBalance: number, turn: number) {
    this.accountBalance = accountBalance
    this.id = id
    this.properties = []
    this.turn = turn
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
    } = objectLikePlayer
    const revivedPlayer = new Player(id, accountBalance, turn)
    revivedPlayer.properties = properties
    revivedPlayer.isBankrupt = isBankrupt
    revivedPlayer.getOutOfJailCards = getOutOfJailCards
    revivedPlayer.isInJail = isInJail
    revivedPlayer.currentTilePosition = currentTilePosition
    return revivedPlayer
  }
}
