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
  public type = 'HOUSING'
  public housesCount: number = 0
  public hotelsCount: number = 0
  public color?: string
  public rent: HousingPropertyRent
  public pricePerHouse: number

  constructor(
    name: string,
    price: number,
    rent: HousingPropertyRent,
    pricePerHouse: number,
    color?: string
  ) {
    super(name, price)
    this.color = color
    this.rent = rent
    this.pricePerHouse = pricePerHouse
  }
}
export default HousingProperty
