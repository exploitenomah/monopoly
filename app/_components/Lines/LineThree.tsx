import Line from "./Line"
import LineThreeTiles from "@/app/_lines/LineThreeTiles"

export default function LineThree() {
  return (
    <div className="absolute w-[75%] h-[12%] border-t-[1px] lg:border-t-[3px] border-solid border-black left-[50%] rotate-[180deg] translate-x-[-50%] top-0">
        <Line tiles={LineThreeTiles}/>
      </div>
  )
}
