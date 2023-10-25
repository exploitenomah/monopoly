export default class Player {
  turn: number
  accountBalance: number
  id: number
  properties: []
  isBankrupt: boolean = false
  getOutOfJailCards: {
    chance: null
    communityChest: null
  } = {
    chance: null,
    communityChest: null,
  }
  isInJail: boolean = false

  constructor({
    turn,
    accountBalance,
    id,
  }: {
    accountBalance: number
    turn: number
    id: number
  }) {
    this.turn = turn
    this.accountBalance = accountBalance
    this.id = id
    this.properties = []
  }
}
