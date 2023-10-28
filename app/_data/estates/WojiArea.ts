import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#008836"

const WojiArea = [
  new HousingProperty(crypto.randomUUID(),
    "Woji",
    300,
    {
      default: 50,
      oneHouse: 130,
      twoHouses: 390,
      threeHouses: 900,
      fourHouses: 1100,
      hotel: 1300,
    },
    200,
    estateColor
  ),
  new HousingProperty(crypto.randomUUID(),
    "Ada George",
    300,
    {
      default: 50,
      oneHouse: 130,
      twoHouses: 390,
      threeHouses: 900,
      fourHouses: 1100,
      hotel: 1300,
    },
    200,
    estateColor
  ),
  new HousingProperty(crypto.randomUUID(),
    "Rumuokwuta",
    320,
    {
      default: 55,
      oneHouse: 150,
      twoHouses: 450,
      threeHouses: 1000,
      fourHouses: 1200,
      hotel: 1400,
    },
    200,
    estateColor
  ),
]
export default WojiArea
