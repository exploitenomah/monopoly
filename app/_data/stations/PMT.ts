import StationProperty from "@/app/_classes/StationProperty"

const CHISCOBusStation = new StationProperty(crypto.randomUUID(), "PMT", 200, {
  oneStationOwned: 25,
  twoStationsOwned: 50,
  threeStationsOwned: 100,
  fourStationsOwned: 200,
})
export default CHISCOBusStation
