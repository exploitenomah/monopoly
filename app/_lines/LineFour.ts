import WojiArea from "../_data/estates/WojiArea"
import TransAmadiArea from "../_data/estates/TransAmadiArea"
import Tile from "../_classes/Tile"
import Space from "../_classes/Space"
import GIGBusStation from "../_data/stations/GIG"

const LineFour = [
  WojiArea[0],
  WojiArea[1],
  new Space(crypto.randomUUID(), "COMMUNITY-CHEST"),
  WojiArea[2],
  GIGBusStation,
  TransAmadiArea[0],
  new Space(crypto.randomUUID(), "SUPER-TAX"),
  TransAmadiArea[1],
]

export default LineFour
