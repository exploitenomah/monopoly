import HousingProperty from "../../_classes/HousingProperty"
import StationProperty from "../../_classes/StationProperty"
import UtilityProperty from "../../_classes/UtilityProperty"

export function HousingTitleDeed({
  property,
  index,
}: {
  property: HousingProperty
  index: number
}) {
  return (
    <li
      style={{ zIndex: index + 1, marginTop: (index + 1) * 25, marginBottom: -(index + 1) * 25 }}
      className="bg-primary-default text-primary-dark shadow-sm absolutes col-span-full row-span-full w-full  pb-4 text-center rounded-md text-center border-2 border-solid border-black min-h-[200px] w-[100%]"
    >
      {property.color && (
        <div
          className="h-[25px] border-b-[3px] border-b-solid border-b-black"
          style={{ background: property.color }}
        ></div>
      )}
      <h4 className="font-bold text-xl mt-2">{property.name}</h4>
      <ul>
        <li className="font-semibold text-md">Rent with:</li>
        <li> 0 houses: {property.rent.oneHouse}</li>
        <li> 1 houses: {property.rent.twoHouses}</li>
        <li> 2 houses: {property.rent.threeHouses}</li>
        <li> 3 houses: {property.rent.fourHouses}</li>
      </ul>
    </li>
  )
}

export function UtilityTitleDeed({
  property,
  index,
}: {
  property: UtilityProperty
  index: number
}) {
  return (
    <li
      style={{ zIndex: index + 1, marginTop: (index + 1) * 25}}
      className="bg-primary-default text-primary-dark shadow-sm absolutes col-span-full row-span-full w-full  pb-4 text-center rounded-md text-center border-2 border-solid border-black min-h-[200px]"
    >
      <h4>{property.name}</h4>
      <ul>Rent</ul>
    </li>
  )
}

export function StationTitleDeed({
  property,
  index,
}: {
  property: StationProperty
  index: number
}) {
  return (
    <li
      style={{ zIndex: index + 1, marginTop: (index + 1) * 25 }}
      className="bg-primary-default text-primary-dark shadow-sm absolutes col-span-full row-span-full w-full py-4 px-3 text-center rounded-md text-center border-2 border-solid border-black min-h-[200px]"
    >
      <h4 className="font-bold text-xl">{property.name}</h4>
      <ul>
        <li className="font-semibold text-md">Rent with:</li>
        <li>1 Station Owned: {property.rent.oneStationOwned}</li>
        <li>2 Stations Owned: {property.rent.twoStationsOwned}</li>
        <li>3 Stations Owned: {property.rent.threeStationsOwned}</li>
        <li>4 Stations Owned: {property.rent.fourStationsOwned}</li>
      </ul>
    </li>
  )
}
