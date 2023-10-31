import Line from "./Line"
import { TileContent } from "@/app/_classes/Tile"

export default function LineTwo({ tiles }: { tiles: TileContent[] }) {
  return (
    <div className="z-10 absolute w-[75%] h-[12%] border-t-[1px] lg:border-t-[3px] border-solid border-black left-[6%] rotate-[90deg] translate-x-[-50%] bottom-[44%]">
      <Line tiles={tiles} />
    </div>
  )
}
