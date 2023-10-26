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
    name: string,
    price: number,
    rent: UtilityPropertyRent,
    category: string
  ) {
    super(name, price)
    this.rent = rent.default
    this.category = category
  }
}

export default UtilityProperty
