import Property from "./Property"
import Player from "./Player"
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
    id: string,
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

  public static calculateRent(
    property: HousingProperty,
    properties: HousingProperty[]
  ) {
    let totalPropertiesOfType = 3
    if (property.position === 37 || property.position === 39)
      totalPropertiesOfType = 2
    if (property.housesCount === 0 && property.hotelsCount === 0) {
      if (
        (properties as HousingProperty[]).filter(
          (prop) =>
            prop.owner === property.owner && prop.color === property.color
        ).length === totalPropertiesOfType
      )
        return property.rent.default * 2
      else return property.rent.default
    } else if (property.housesCount === 1) {
      return property.rent.oneHouse
    } else if (property.housesCount === 2) {
      return property.rent.twoHouses
    } else if (property.housesCount === 3) {
      return property.rent.threeHouses
    } else if (property.housesCount === 4) {
      return property.rent.fourHouses
    } else if (property.hotelsCount >= 1) {
      return property.rent.hotel * property.hotelsCount
    } else {
      return property.rent.default
    }
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
      id,
      position,
      contents,
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
    revivedHousingProperty.setPosition(position as number)
    revivedHousingProperty.contents = contents.map((el) => Player.revive(el))
    return revivedHousingProperty
  }
}
export default HousingProperty
