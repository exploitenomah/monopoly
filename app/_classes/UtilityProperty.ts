import Property from "./Property"

export interface UtilityPropertyRent {
  default: (valueRolled: number) => number
}

class UtilityProperty extends Property {
  public rent = function (value: number) {
    return value * 10
  }
  constructor(name: string, price: number, rent: UtilityPropertyRent) {
    super(name, price)
    this.rent = rent.default
  }
}

export default UtilityProperty
