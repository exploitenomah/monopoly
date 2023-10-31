import WojiArea from "../_data/estates/WojiArea"
import TransAmadiArea from "../_data/estates/TransAmadiArea"
import Space from "../_classes/Space"
import GIGBusStation from "../_data/stations/GIG"
import { v4 as uuidv4 } from "uuid"

const LineFour = [
  WojiArea[0].setPosition(31),
  WojiArea[1].setPosition(32),
  new Space(uuidv4(), "COMMUNITY-CHEST").setPosition(33),
  WojiArea[2].setPosition(34),
  GIGBusStation.setPosition(35),
  TransAmadiArea[0].setPosition(36),
  new Space(uuidv4(), "SUPER-TAX").setPosition(37),
  TransAmadiArea[1].setPosition(38),
]

export default LineFour
