import GoToJailTile from "../Tiles/GoToJail"
import Space from "@/app/_classes/Space"
import ContentsHolder from "../Tiles/ContentsHolder"

export default function GoToJail({ goToJail }: { goToJail: Space }) {
  return (
    <div className="absolute w-[12.5%] h-[12.5%] border-black border-l-solid border-b-solid border-l-[1px] border-b-[1px] lg:border-l-[3px] lg:border-b-[3px] top-0 right-0">
      <GoToJailTile classType={goToJail} />
      <ContentsHolder contents={goToJail.contents}/>
    </div>
  )
}
