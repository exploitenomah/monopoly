import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = '#fe0000'

const ElemeArea = [
  new HousingProperty(
    "Eleme",
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
    "Rumuokwurushi",
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
    "Oil Mill Road",
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
export default ElemeArea
