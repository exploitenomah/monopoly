import Tile from "../Tiles/Tile"

import TileClass from "@/app/_classes/Tile"

export default function Line({ tiles = [] }: { tiles: TileClass[] }) {
  return (
    <div className="flex flex-row-reverse w-full h-full">
      {tiles.map((tile, idx) => (
        <Tile key={idx} content={tile.content} tileId={tile.id} />
      ))}
    </div>
  )
}
