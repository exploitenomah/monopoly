import Property from "./Property"

export interface StationPropertyRent {
  oneStationOwned: number
  twoStationsOwned: number
  threeStationsOwned: number
  fourStationsOwned: number
}

class StationProperty extends Property {
  public rent: StationPropertyRent
  constructor(name: string, price: number, rent: StationPropertyRent) {
    super(name, price)
    this.rent = rent
  }
}

export default StationProperty
