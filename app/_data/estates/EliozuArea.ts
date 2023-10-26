import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#f7a529"

const Oyigbo = [
  new HousingProperty(
    "Eliozu",
    120,
    {
      default: 4,
      oneHouse: 10,
      twoHouses: 30,
      threeHouses: 90,
      fourHouses: 160,
      hotel: 250,
    },
    100,
    estateColor
  ),
  new HousingProperty(
    "Rumoudara",
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
  new HousingProperty(
    "Tank",
    140,
    {
      default: 4,
      oneHouse: 20,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450,
    },
    120,
    estateColor
  ),
]
export default Oyigbo
