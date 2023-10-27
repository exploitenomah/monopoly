import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#fdff00"

const RumuolaArea = [
  new HousingProperty(
    "Rumuola",
    260,
    {
      default: 40,
      oneHouse: 110,
      twoHouses: 330,
      threeHouses: 800,
      fourHouses: 950,
      hotel: 1150,
    },
    150,
    estateColor
  ),
  new HousingProperty(
    "Garrison",
    260,
    {
      default: 40,
      oneHouse: 110,
      twoHouses: 330,
      threeHouses: 800,
      fourHouses: 950,
      hotel: 1150,
    },
    150,
    estateColor
  ),
  new HousingProperty(
    "Waterlines",
    280,
    {
      default: 45,
      oneHouse: 120,
      twoHouses: 360,
      threeHouses: 850,
      fourHouses: 1000,
      hotel: 1200,
    },
    150,
    estateColor
  ),
]
export default RumuolaArea
