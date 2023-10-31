import Property from "./Property"
import Player from "./Player"

export interface UtilityPropertyRent {
  default: (valueRolled: number) => number
}

class UtilityProperty extends Property {
  public type = "UTILITY"
  public category: string
  public rent = function (value: number) {
    return value * 10
  }
  constructor(id: string, name: string, price: number, category: string) {
    super(id, name, price)
    this.category = category
  }

  public static revive(objectLikeUtilityProperty: UtilityProperty) {
    const {
      rent,
      name,
      price,
      isOwned,
      owner,
      isMortgaged,
      mortgageValue,
      redemptionValue,
      category,
      id,
      position,
      contents,
    } = objectLikeUtilityProperty
    const revivedUtilityProperty = new UtilityProperty(
      id,
      name,
      price,
      category
    )
    revivedUtilityProperty.rent = rent
    revivedUtilityProperty.name = name
    revivedUtilityProperty.price = price
    revivedUtilityProperty.isOwned = isOwned
    revivedUtilityProperty.owner = owner
    revivedUtilityProperty.isMortgaged = isMortgaged
    revivedUtilityProperty.mortgageValue = mortgageValue
    revivedUtilityProperty.redemptionValue = redemptionValue
    revivedUtilityProperty.setPosition(position as number)
    revivedUtilityProperty.contents = contents.map((content) =>
      Player.revive(content)
    )
    return revivedUtilityProperty
  }
}

export default UtilityProperty
