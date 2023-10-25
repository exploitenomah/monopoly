import OyigboArea from "../_data/estates/OyigboArea"
import ChobaArea from "../_data/estates/ChobaArea"
import Tile from "../_classes/Tile"
import Space from "../_classes/Space"
import CHISCOBusStation from "../_data/stations/CHISCO"


const LineOneTiles = [
  new Tile(1, OyigboArea[0]),
  new Tile(2, new Space("CHEST")),
  new Tile(3, OyigboArea[1]),
  new Tile(4, new Space("INCOME-TAX")),
  new Tile(5, CHISCOBusStation),
  new Tile(6, ChobaArea[0]),
  new Tile(7, new Space("CHANCE")),
  new Tile(8, ChobaArea[1]),
  new Tile(9, ChobaArea[2]),
]


export default LineOneTiles