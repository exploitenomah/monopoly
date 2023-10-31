import RumuosiArea from "../_data/estates/RumuosiArea"
import EliozuArea from "../_data/estates/EliozuArea"
import Space from "../_classes/Space"
import ABCBusStation from "../_data/stations/ABC"
import CWAYWater from "../_data/utilities/CWAY"
import { v4 as uuidv4 } from "uuid"

const LineTwo = [
  RumuosiArea[0].setPosition(11),
  CWAYWater.setPosition(12),
  RumuosiArea[1].setPosition(13),
  RumuosiArea[2].setPosition(14),
  ABCBusStation.setPosition(15),
  EliozuArea[0].setPosition(16),
  new Space(uuidv4(), "COMMUNITY-CHEST").setPosition(17),
  EliozuArea[1].setPosition(18),
  EliozuArea[2].setPosition(19),
]

export default LineTwo
