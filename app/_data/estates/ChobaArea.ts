import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#86c7ea"

const ChobaArea = [
  new HousingProperty(
    "Alakahia",
    80,
    {
      default: 4,
      oneHouse: 10,
      twoHouses: 30,
      threeHouses: 90,
      fourHouses: 160,
      hotel: 250,
    },
    70,
    estateColor
  ),
  new HousingProperty(
    "Back Of Chem",
    80,
    {
      default: 4,
      oneHouse: 20,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450,
    },
    70,
    estateColor
  ),
  new HousingProperty(
    "Choba",
    100,
    {
      default: 4,
      oneHouse: 20,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450,
    },
    90,
    estateColor
  ),
]
export default ChobaArea
