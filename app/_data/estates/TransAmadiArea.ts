import HousingProperty from "@/app/_classes/HousingProperty"

const estateColor = "#0f108c"

const TransAmadiArea = [
  new HousingProperty(crypto.randomUUID(),
    "New GRA",
    350,
    {
      default: 65,
      oneHouse: 200,
      twoHouses: 500,
      threeHouses: 1100,
      fourHouses: 1300,
      hotel: 1500,
    },
    200,
    estateColor
  ),
  new HousingProperty(crypto.randomUUID(),
    "Trans Amadi",
      400,
    {
      default: 70,
      oneHouse: 200,
      twoHouses: 600,
      threeHouses: 1400,
      fourHouses: 1700,
      hotel: 2000,
    },
    200,
    estateColor
  ),
]
export default TransAmadiArea
