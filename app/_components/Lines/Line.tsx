import Tile from "../Tiles/PropertyTile"

export default function Line({ tiles = [] }: { tiles: any[] }) {
  return (
    <div className="flex flex-row-reverse w-full h-full">
      {tiles.map((tile, idx) => (
        <Tile key={idx} color={tile.content?.color} />
      ))}
    </div>
  )
}
