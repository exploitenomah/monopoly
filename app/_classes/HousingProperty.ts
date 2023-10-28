import Property from "./Property"

export interface HousingPropertyRent {
  default: number
  oneHouse: number
  twoHouses: number
  threeHouses: number
  fourHouses: number
  hotel: number
}

class HousingProperty extends Property {
  public type = "HOUSING"
  public housesCount: number = 0
  public hotelsCount: number = 0
  public color?: string
  public rent: HousingPropertyRent
  public pricePerHouse: number

  constructor(
    id:string,
    name: string,
    price: number,
    rent: HousingPropertyRent,
    pricePerHouse: number,
    color?: string
  ) {
    super(id, name, price)
    this.color = color
    this.rent = rent
    this.pricePerHouse = pricePerHouse
  }

  public static revive(objectLikeHousingProperty: HousingProperty) {
    const {
      housesCount,
      hotelsCount,
      color,
      rent,
      pricePerHouse,
      name,
      price,
      isOwned,
      owner,
      isMortgaged,
      mortgageValue,
      redemptionValue,
      id
    } = objectLikeHousingProperty
    const revivedHousingProperty = new HousingProperty(
      id,
      name,
      price,
      rent,
      pricePerHouse,
      color
    )
    revivedHousingProperty.housesCount = housesCount
    revivedHousingProperty.hotelsCount = hotelsCount
    revivedHousingProperty.color = color
    revivedHousingProperty.rent = rent
    revivedHousingProperty.pricePerHouse = pricePerHouse
    revivedHousingProperty.name = name
    revivedHousingProperty.price = price
    revivedHousingProperty.isOwned = isOwned
    revivedHousingProperty.owner = owner
    revivedHousingProperty.isMortgaged = isMortgaged
    revivedHousingProperty.mortgageValue = mortgageValue
    revivedHousingProperty.redemptionValue = redemptionValue
    return revivedHousingProperty
  }
}
export default HousingProperty
