import RumuosiArea from "../_data/estates/RumuosiArea"
import EliozuArea from "../_data/estates/EliozuArea"
import Tile from "../_classes/Tile"
import Space from "../_classes/Space"
import ABCBusStation from "../_data/stations/ABC"
import CWAYWater from "../_data/utilities/CWAY"

const LineTwoTiles = [
  new Tile(11, RumuosiArea[0]),
  new Tile(11, CWAYWater),
  new Tile(13, RumuosiArea[1]),
  new Tile(14, RumuosiArea[2]),
  new Tile(15, ABCBusStation),
  new Tile(16, EliozuArea[0]),
  new Tile(17, new Space("COMMUNITY-CHEST")),
  new Tile(18, EliozuArea[1]),
  new Tile(19, EliozuArea[2]),
]

export default LineTwoTiles
