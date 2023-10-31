import StationProperty from "@/app/_classes/StationProperty"
import { v4 as uuidv4 } from 'uuid';

const GIGBusStation = new StationProperty(uuidv4(), "GIG", 200, {
  oneStationOwned: 25,
  twoStationsOwned: 50,
  threeStationsOwned: 100,
  fourStationsOwned: 200,
})
export default GIGBusStation
