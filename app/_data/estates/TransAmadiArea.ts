import HousingProperty from "@/app/_classes/HousingProperty"
import { v4 as uuidv4 } from "uuid"

const estateColor = "#0f108c"

const TransAmadiArea = [
  new HousingProperty(
    uuidv4(),
    "New GRA",
    350,
    {
      default: 65,
      oneHouse: 200,
      twoHouses: 500,
      threeHouses: 1100,
      fourHouses: 1300,
      hotel: 1500,
    },
    200,
    estateColor
  ),
  new HousingProperty(
    uuidv4(),
    "Trans Amadi",
    400,
    {
      default: 70,
      oneHouse: 200,
      twoHouses: 600,
      threeHouses: 1400,
      fourHouses: 1700,
      hotel: 2000,
    },
    200,
    estateColor
  ),
]
export default TransAmadiArea
