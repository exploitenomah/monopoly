import Property from "./Property"
import Player from "./Player"

class UtilityProperty extends Property {
  public type = "UTILITY"
  public category: string

  constructor(id: string, name: string, price: number, category: string) {
    super(id, name, price)
    this.category = category
  }

  public static calculateRent(
    property: UtilityProperty,
    properties: UtilityProperty[],
    dieValue?: number
  ) {
    const allUtilitiesOwnedByPropertyOwner = properties.filter(
      (prop) =>
        prop.type === "UTILITY" &&
        prop.owner === (property as UtilityProperty).owner
    )
    if (allUtilitiesOwnedByPropertyOwner.length === 2) {
      return 10 * ((dieValue || 1) * 2)
    } else {
      return 10 * (dieValue || 1)
    }
  }

  public static revive(objectLikeUtilityProperty: UtilityProperty) {
    const {
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
