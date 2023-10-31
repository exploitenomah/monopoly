import JailTile from "../Tiles/Jail"
import Space from '@/app/_classes/Space'
import ContentsHolder from "../Tiles/ContentsHolder"

export default function Jail({ jail }: {
  jail: Space
}) {
  return (
    <div className="absolute w-[12.5%] h-[12.5%] border-black border-r-solid border-t-solid border-r-[1px] border-t-[1px] lg:border-r-[3px] lg:border-t-[3px] bottom-0 left-0">
      <JailTile  classType={jail}/>
      <ContentsHolder contents={jail.contents} position={jail.position as number} />
    </div>
  )
}
