import HousingProperty from "@/app/_classes/HousingProperty"
import { v4 as uuidv4 } from "uuid"

const estateColor = "#fe0000"

const ElemeArea = [
  new HousingProperty(
    uuidv4(),
    "Eleme",
    220,
    {
      default: 30,
      oneHouse: 90,
      twoHouses: 250,
      threeHouses: 700,
      fourHouses: 875,
      hotel: 1050,
    },
    150,
    estateColor
  ),
  new HousingProperty(
    uuidv4(),
    "Rumuokwurushi",
    220,
    {
      default: 30,
      oneHouse: 90,
      twoHouses: 250,
      threeHouses: 700,
      fourHouses: 875,
      hotel: 1050,
    },
    150,
    estateColor
  ),
  new HousingProperty(
    uuidv4(),
    "Oil Mill Road",
    240,
    {
      default: 35,
      oneHouse: 100,
      twoHouses: 300,
      threeHouses: 750,
      fourHouses: 900,
      hotel: 1100,
    },
    150,
    estateColor
  ),
]
export default ElemeArea
