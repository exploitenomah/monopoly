import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#fdff00"

const RumuolaArea = [
  new HousingProperty(
    "Rumuola",
    180,
    {
      default: 4,
      oneHouse: 10,
      twoHouses: 30,
      threeHouses: 90,
      fourHouses: 160,
      hotel: 250,
    },
    160,
    estateColor
  ),
  new HousingProperty(
    "Garrison",
    180,
    {
      default: 4,
      oneHouse: 20,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450,
    },
    160,
    estateColor
  ),
  new HousingProperty(
    "Waterlines",
    200,
    {
      default: 4,
      oneHouse: 20,
      twoHouses: 60,
      threeHouses: 180,
      fourHouses: 320,
      hotel: 450,
    },
    180,
    estateColor
  ),
]
export default RumuolaArea
