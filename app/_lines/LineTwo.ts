import RumuosiArea from "../_data/estates/RumuosiArea"
import EliozuArea from "../_data/estates/EliozuArea"
import Space from "../_classes/Space"
import ABCBusStation from "../_data/stations/ABC"
import CWAYWater from "../_data/utilities/CWAY"

const LineTwo = [
  RumuosiArea[0],
  CWAYWater,
  RumuosiArea[1],
  RumuosiArea[2],
  ABCBusStation,
  EliozuArea[0],
  new Space(crypto.randomUUID(), "COMMUNITY-CHEST"),
  EliozuArea[1],
  EliozuArea[2],
]

export default LineTwo
