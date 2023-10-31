import Property from "./Property"
import Player from './Player'

export interface StationPropertyRent {
  oneStationOwned: number
  twoStationsOwned: number
  threeStationsOwned: number
  fourStationsOwned: number
}

class StationProperty extends Property {
  public type = "STATION"
  public rent: StationPropertyRent
  constructor(id: string, name: string, price: number, rent: StationPropertyRent) {
    super(id, name, price)
    this.rent = rent
  }

  public static revive(objectLikeStationProperty: StationProperty) {
    const {
      rent,
      name,
      price,
      isOwned,
      owner,
      isMortgaged,
      mortgageValue,
      redemptionValue,
      position,
      id,
      contents
    } = objectLikeStationProperty
    const revivedStationProperty = new StationProperty(id, name, price, rent)
    revivedStationProperty.rent = rent
    revivedStationProperty.name = name
    revivedStationProperty.price = price
    revivedStationProperty.isOwned = isOwned
    revivedStationProperty.owner = owner
    revivedStationProperty.isMortgaged = isMortgaged
    revivedStationProperty.mortgageValue = mortgageValue
    revivedStationProperty.redemptionValue = redemptionValue
    revivedStationProperty.setPosition(position as number)
    revivedStationProperty.contents = contents.map(content => Player.revive(content))
    return revivedStationProperty
  }
}

export default StationProperty
