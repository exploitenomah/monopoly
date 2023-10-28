import Player from "./Player"

class  Property {
  public isOwned: boolean = false
  public owner: null | Player = null
  public price: number
  public isMortgaged: boolean = false
  public mortgageValue: number
  public redemptionValue: number
  public name: string
  public id: string

  constructor(id:string, name: string, price: number) {
    this.id = id
    this.name = name
    this.price = price
    this.mortgageValue = this.price / 2
    this.redemptionValue = this.mortgageValue + 0.1 * this.mortgageValue
  }

  public static revive(objectLikeProperty: Property) {
    const {
      name,
      price,
      isOwned,
      owner,
      isMortgaged,
      mortgageValue,
      redemptionValue,
      id,
    } = objectLikeProperty
    const revivedProperty = new Property(
      id,
      name,
      price
    )
    revivedProperty.name= name
    revivedProperty.price= price
    revivedProperty.isOwned= isOwned
    revivedProperty.owner= owner 
    revivedProperty.isMortgaged=  isMortgaged
    revivedProperty.mortgageValue= mortgageValue
    revivedProperty.redemptionValue= redemptionValue
    return revivedProperty
  }
}

export default Property
