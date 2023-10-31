import OyigboArea from "../_data/estates/OyigboArea"
import ChobaArea from "../_data/estates/ChobaArea"
import Space from "../_classes/Space"
import PMTBusStation from "../_data/stations/PMT"
import { v4 as uuidv4 } from "uuid"

const LineOne = [
  OyigboArea[0].setPosition(1),
  new Space(uuidv4(), "COMMUNITY-CHEST").setPosition(2),
  OyigboArea[1].setPosition(3),
  new Space(uuidv4(), "INCOME-TAX").setPosition(4),
  PMTBusStation.setPosition(5),
  ChobaArea[0].setPosition(6),
  new Space(uuidv4(), "CHANCE").setPosition(7),
  ChobaArea[1].setPosition(8),
  ChobaArea[2].setPosition(9),
]

export default LineOne
