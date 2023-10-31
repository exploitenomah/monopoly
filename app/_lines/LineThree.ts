import ElemeArea from "../_data/estates/ElemeArea"
import RumuolaArea from "../_data/estates/RumuolaArea"
import Space from "../_classes/Space"
import GUOBusStation from "../_data/stations/GUO"
import PHCN from "../_data/utilities/PHCN"
import { v4 as uuidv4 } from "uuid"

const LineThree = [
  ElemeArea[0].setPosition(21),
  new Space(uuidv4(), "CHANCE").setPosition(22),
  ElemeArea[1].setPosition(23),
  ElemeArea[2].setPosition(24),
  GUOBusStation.setPosition(25),
  RumuolaArea[0].setPosition(26),
  RumuolaArea[1].setPosition(27),
  PHCN.setPosition(28),
  RumuolaArea[2].setPosition(29),
]

export default LineThree
