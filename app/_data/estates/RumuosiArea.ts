import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#a2449f"

const RumuosiArea = [
  new HousingProperty(
    "Rumuosi",
    100,
    {
      default: 4,
      oneHouse: 10,
      twoHouses: 30,
      threeHouses: 90,
      fourHouses: 160,
      hotel: 250,
    },
    80,
    estateColor
  ),
  new HousingProperty(
    "NTA Road",
    100,
    {
      default: 4,
      oneHouse: 20,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450,
    },
    80,
    estateColor
  ),
  new HousingProperty(
    "Nkpolu",
    120,
    {
      default: 4,
      oneHouse: 20,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450,
    },
    100,
    estateColor
  ),
]
export default RumuosiArea
