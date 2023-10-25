import Line from "./Line"
import LineOneTiles from '@/app/_lines/LineOneTiles'

export default function LineOne() {
  return (
    <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-[75%] h-[12%] border-t-[1px] lg:border-t-[3px] border-black border-solid ">
      <Line tiles={LineOneTiles} />
    </div>
  )
}
