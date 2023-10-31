import HousingProperty from "@/app/_classes/HousingProperty"
import { v4 as uuidv4 } from "uuid"

const estateColor = "#fdff00"

const RumuolaArea = [
  new HousingProperty(
    uuidv4(),
    "Rumuola",
    260,
    {
      default: 40,
      oneHouse: 110,
      twoHouses: 330,
      threeHouses: 800,
      fourHouses: 950,
      hotel: 1150,
    },
    150,
    estateColor
  ),
  new HousingProperty(
    uuidv4(),
    "Garrison",
    260,
    {
      default: 40,
      oneHouse: 110,
      twoHouses: 330,
      threeHouses: 800,
      fourHouses: 950,
      hotel: 1150,
    },
    150,
    estateColor
  ),
  new HousingProperty(
    uuidv4(),
    "Waterlines",
    280,
    {
      default: 45,
      oneHouse: 120,
      twoHouses: 360,
      threeHouses: 850,
      fourHouses: 1000,
      hotel: 1200,
    },
    150,
    estateColor
  ),
]
export default RumuolaArea
