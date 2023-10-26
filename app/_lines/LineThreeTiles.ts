import ElemeArea from "../_data/estates/ElemeArea"
import RumuolaArea from "../_data/estates/RumuolaArea"
import Tile from "../_classes/Tile"
import Space from "../_classes/Space"
import GUOBusStation from "../_data/stations/GUO"
import PHCN from "../_data/utilities/PHCN"

const LineThreeTiles = [
  new Tile(21, ElemeArea[0]),
  new Tile(22, new Space("CHANCE")),
  new Tile(23, ElemeArea[1]),
  new Tile(24, ElemeArea[2]),
  new Tile(25, GUOBusStation),
  new Tile(26, RumuolaArea[0]),
  new Tile(27, RumuolaArea[1]),
  new Tile(28, PHCN),
  new Tile(29, RumuolaArea[2]),
]

export default LineThreeTiles
