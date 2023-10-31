import HousingProperty from "@/app/_classes/HousingProperty"
import { v4 as uuidv4 } from "uuid"

const estateColor = "#a2449f"

const RumuosiArea = [
  new HousingProperty(
    uuidv4(),
    "Rumuosi",
    140,
    {
      default: 15,
      oneHouse: 50,
      twoHouses: 150,
      threeHouses: 450,
      fourHouses: 600,
      hotel: 750,
    },
    100,
    estateColor
  ),
  new HousingProperty(
    uuidv4(),
    "NTA Road",
    140,
    {
      default: 15,
      oneHouse: 50,
      twoHouses: 150,
      threeHouses: 450,
      fourHouses: 600,
      hotel: 750,
    },
    100,
    estateColor
  ),
  new HousingProperty(
    uuidv4(),
    "Nkpolu",
    160,
    {
      default: 20,
      oneHouse: 60,
      twoHouses: 180,
      threeHouses: 500,
      fourHouses: 700,
      hotel: 900,
    },
    100,
    estateColor
  ),
]
export default RumuosiArea
