import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#008836"

const WojiArea = [
  new HousingProperty(
    "Woji",
    60,
    {
      default: 4,
      oneHouse: 10,
      twoHouses: 30,
      threeHouses: 90,
      fourHouses: 160,
      hotel: 250,
    },
    50,
    estateColor
  ),
  new HousingProperty(
    "Ada George",
    60,
    {
      default: 4,
      oneHouse: 20,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450,
    },
    50,
    estateColor
  ),
  new HousingProperty(
    "Rumuokwuta",
    60,
    {
      default: 4,
      oneHouse: 20,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450,
    },
    50,
    estateColor
  ),
]
export default WojiArea
