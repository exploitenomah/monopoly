import ElemeArea from "../_data/estates/ElemeArea"
import RumuolaArea from "../_data/estates/RumuolaArea"
import Space from "../_classes/Space"
import GUOBusStation from "../_data/stations/GUO"
import PHCN from "../_data/utilities/PHCN"

const LineThree = [
  ElemeArea[0],
  new Space(crypto.randomUUID(), "CHANCE"),
  ElemeArea[1],
  ElemeArea[2],
  GUOBusStation,
  RumuolaArea[0],
  RumuolaArea[1],
  PHCN,
  RumuolaArea[2],
]

export default LineThree
