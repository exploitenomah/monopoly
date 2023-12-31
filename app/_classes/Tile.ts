import HousingProperty from "./HousingProperty"
import UtilityProperty from "./UtilityProperty"
import StationProperty from "./StationProperty"
import Space from "./Space"

export type TileContent =
  | HousingProperty
  | UtilityProperty
  | StationProperty
  | Space

export default class Tile {
  id: number
  content: TileContent
  constructor(tileId: number, content: TileContent) {
    this.id = tileId
    this.content = content
  }
}
