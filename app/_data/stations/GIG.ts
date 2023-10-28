import StationProperty from "@/app/_classes/StationProperty"

const GIGBusStation = new StationProperty(crypto.randomUUID(),
    "GIG",
    200,
    {
 oneStationOwned: 25,
  twoStationsOwned: 50,
  threeStationsOwned: 100,
  fourStationsOwned: 200,
    }
      )
export default GIGBusStation
