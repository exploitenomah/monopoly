import HousingProperty from "@/app/_classes/HousingProperty"
import { v4 as uuidv4 } from "uuid"

const estateColor = "#364c60"

const Oyigbo = [
  new HousingProperty(
    uuidv4(),
    "Kom Kom",
    60,
    {
      default: 5,
      oneHouse: 15,
      twoHouses: 30,
      threeHouses: 90,
      fourHouses: 160,
      hotel: 250,
    },
    50,
    estateColor
  ),
  new HousingProperty(
    uuidv4(),
    "Afam Road",
    60,
    {
      default: 10,
      oneHouse: 25,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450,
    },
    50,
    estateColor
  ),
]
export default Oyigbo
