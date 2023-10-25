import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#f7a529"

const Oyigbo = [
  new HousingProperty(
    "Eliozu",
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
    "Rumoudara",
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
    "Tank",
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
export default Oyigbo
