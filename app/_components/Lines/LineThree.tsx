import Line from "./Line"
import { TileContent } from "@/app/_classes/Tile"

export default function LineThree({ tiles }: { tiles: TileContent[] }) {
  return (
    <div className="z-10 absolute w-[75%] h-[12%] border-t-[1px] lg:border-t-[3px] border-solid border-black left-[50%] rotate-[180deg] translate-x-[-50%] top-0">
        <Line tiles={tiles}/>
      </div>
  )
}
