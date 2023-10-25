import HousingProperty from "./HousingProperty"
import UtilityProperty from "./UtilityProperty"
import StationProperty from "./StationProperty"
import DeckDrawer from "./Space"

type TileContent =
  | HousingProperty
  | UtilityProperty
  | StationProperty
  | DeckDrawer

export default class Tile {
  id: number
  content: TileContent
  constructor(tileId: number, content: TileContent) {
    this.id = tileId
    this.content = content
  }
}
