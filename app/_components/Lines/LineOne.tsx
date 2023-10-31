import Line from "./Line"
import { TileContent } from "@/app/_classes/Tile"

export default function LineOne({ tiles = [] }: { tiles: TileContent[] }) {
  return (
    <div className="z-10 absolute bottom-0 left-[50%] translate-x-[-50%] w-[75%] h-[12%] border-t-[1px] lg:border-t-[3px] border-black border-solid ">
      <Line tiles={tiles} />
    </div>
  )
}
