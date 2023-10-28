import StationProperty from "@/app/_classes/StationProperty"

const ABCBusStation = new StationProperty(crypto.randomUUID(),"ABC", 200, {
  oneStationOwned: 25,
  twoStationsOwned: 50,
  threeStationsOwned: 100,
  fourStationsOwned: 200,
})
export default ABCBusStation
