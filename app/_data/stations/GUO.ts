import StationProperty from "@/app/_classes/StationProperty"

const GUOBusStation = new StationProperty(crypto.randomUUID(),"GUO", 200, {
  oneStationOwned: 25,
  twoStationsOwned: 50,
  threeStationsOwned: 100,
  fourStationsOwned: 200,
})
export default GUOBusStation
