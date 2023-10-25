import FreeParkingTile from "../Tiles/FreeParking"

export default function FreeParking() {
  return (
    <div className="absolute w-[12.5%] h-[12.5%] border-black border-r-solid border-b-solid border-r-[1px] border-b-[1px] lg:border-r-[3px] lg:border-b-[3px] top-0 left-0">
      <FreeParkingTile />
    </div>
  )
}
