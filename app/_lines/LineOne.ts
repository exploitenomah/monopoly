import OyigboArea from "../_data/estates/OyigboArea"
import ChobaArea from "../_data/estates/ChobaArea"
import Space from "../_classes/Space"
import PMTBusStation from "../_data/stations/PMT"

const LineOne = [
  OyigboArea[0],
  new Space(crypto.randomUUID(), "COMMUNITY-CHEST"),
  OyigboArea[1],
  new Space(crypto.randomUUID(), "INCOME-TAX"),
  PMTBusStation,
  ChobaArea[0],
  new Space(crypto.randomUUID(), "CHANCE"),
  ChobaArea[1],
  ChobaArea[2],
]

export default LineOne
