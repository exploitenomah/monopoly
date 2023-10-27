import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#86c7ea"

const ChobaArea = [
  new HousingProperty(
    "Alakahia",
    100,
    {
      default: 10,
      oneHouse: 30,
      twoHouses: 90,
      threeHouses: 270,
      fourHouses: 400,
      hotel: 550,
    },
    100,
    estateColor
  ),
  new HousingProperty(
    "Back Of Chem",
    100,
    {
      default: 10,
      oneHouse: 30,
      twoHouses: 90,
      threeHouses: 270,
      fourHouses: 400,
      hotel: 550,
    },
    100,
    estateColor
  ),
  new HousingProperty(
    "Choba",
    120,
    {
      default: 15,
      oneHouse: 40,
      twoHouses: 100,
      threeHouses: 300,
      fourHouses: 450,
      hotel: 600,
    },
    100,
    estateColor
  ),
]
export default ChobaArea
