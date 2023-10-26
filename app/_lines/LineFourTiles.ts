import WojiArea from "../_data/estates/WojiArea"
import TransAmadiArea from "../_data/estates/TransAmadiArea"
import Tile from "../_classes/Tile"
import Space from "../_classes/Space"
import GIGBusStation from "../_data/stations/GIG"

const LineFourTiles = [
  new Tile(31, WojiArea[0]),
  new Tile(31, WojiArea[1]),
  new Tile(37, new Space("COMMUNITY-CHEST")),
  new Tile(33, WojiArea[2]),
  new Tile(35, GIGBusStation),
  new Tile(36, TransAmadiArea[0]),
  new Tile(35, new Space("SUPER-TAX")),
  new Tile(38, TransAmadiArea[1]),
]

export default LineFourTiles
