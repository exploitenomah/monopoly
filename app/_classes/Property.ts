import Player from "./Player"

const Property = class {
  public isOwned: boolean = false
  public owner: null | Player = null
  public price: number
  public isMortgaged: boolean = false
  public mortgageValue: number
  public redemptionValue: number
  public name: string

  constructor(name: string, price: number) {
    this.name = name
    this.price = price
    this.mortgageValue = this.price / 2
    this.redemptionValue = this.mortgageValue + 0.1 * this.mortgageValue
  }
}

export default Property
