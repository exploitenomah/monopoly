import Line from "./Line"
import LineTwoTiles from "@/app/_lines/LineTwoTiles"

export default function LineTwo() {
  return (
    <div className="absolute w-[75%] h-[12%] border-t-[1px] lg:border-t-[3px] border-solid border-black left-[6%] rotate-[90deg] translate-x-[-50%] bottom-[44%]">
      <Line tiles={LineTwoTiles} />
    </div>
  )
}
