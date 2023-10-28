import Property from "./Property"

export interface UtilityPropertyRent {
  default: (valueRolled: number) => number
}

class UtilityProperty extends Property {
  public type = "UTILITY"
  public category: string
  public rent = function (value: number) {
    return value * 10
  }
  constructor(
    id: string,
    name: string,
    price: number,
    category: string
  ) {
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
      id
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
    return revivedUtilityProperty
  }
}

export default UtilityProperty
