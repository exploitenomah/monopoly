import Line from "./Line"
import LineFourTiles from "@/app/_lines/LineFourTiles"

export default function LineFour() {
  return (
    <div className="absolute w-[75%] h-[12%] border-t-[1px] lg:border-t-[3px] border-black border-solid right-[6%] rotate-[270deg] translate-x-[50%] bottom-[44%]">
      <Line tiles={LineFourTiles} />
    </div>
  )
}
