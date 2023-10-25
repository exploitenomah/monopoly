import GoTile from "../Tiles/Go"

export default function Go() {
  return (
    <div className="absolute w-[12.5%] h-[12.5%] border-black border-l-solid border-t-solid border-l-[1px] border-t-[1px] lg:border-l-[3px] lg:border-t-[3px] bottom-0 right-0">
      <GoTile />
    </div>
  )
}
