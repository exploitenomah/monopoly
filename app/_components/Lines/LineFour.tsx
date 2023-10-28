import Line from "./Line"
import { TileContent } from "@/app/_classes/Tile"

export default function LineFour({ tiles }: { tiles: TileContent[] }) {
  return (
    <div className="absolute w-[75%] h-[12%] border-t-[1px] lg:border-t-[3px] border-black border-solid right-[6%] rotate-[270deg] translate-x-[50%] bottom-[44%]">
      <Line tiles={tiles} />
    </div>
  )
}
