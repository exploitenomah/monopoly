import Tile from "../Tiles/Tile"
import { TileContent } from "@/app/_classes/Tile"

export default function Line({ tiles = [] }: { tiles: TileContent[] }) {
  return (
    <div className="flex flex-row-reverse w-full h-full">
      {tiles.map((tile, idx) => (
        <Tile key={tile.id} content={tile} tileId={tile.id} />
      ))}
    </div>
  )
}
