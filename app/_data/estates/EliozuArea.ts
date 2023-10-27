import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#f7a529"

const Oyigbo = [
  new HousingProperty(
    "Eliozu",
    180,
    {
      default: 25,
      oneHouse: 70,
      twoHouses: 200,
      threeHouses: 550,
      fourHouses: 700,
      hotel: 950,
    },
    100,
    estateColor
  ),
  new HousingProperty(
    "Rumoudara",
    180,
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
    200,
    {
      default: 25,
      oneHouse: 80,
      twoHouses: 220,
      threeHouses: 600,
      fourHouses: 800,
      hotel: 1000,
    },
    100,
    estateColor
  ),
]
export default Oyigbo
