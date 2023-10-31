import FreeParkingTile from "../Tiles/FreeParking"
import Space from "@/app/_classes/Space"
import ContentsHolder from "../Tiles/ContentsHolder"

export default function FreeParking({ freeParking }: { freeParking: Space }) {
  return (
    <div className="absolute w-[12.5%] h-[12.5%] border-black border-r-solid border-b-solid border-r-[1px] border-b-[1px] lg:border-r-[3px] lg:border-b-[3px] top-0 left-0">
      <FreeParkingTile classType={freeParking} />
      <ContentsHolder
        contents={freeParking.contents}
        position={freeParking.position as number}
      />
    </div>
  )
}
