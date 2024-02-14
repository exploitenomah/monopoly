import HousingProperty from "../../_classes/HousingProperty"
import StationProperty from "../../_classes/StationProperty"
import UtilityProperty from "../../_classes/UtilityProperty"

export function HousingTitleDeed({
  property,
}: {
  property: HousingProperty
}) {
  return (
    <div
      className="bg-primary-default text-primary-dark shadow-sm col-span-full row-span-full w-full  pb-4 text-center rounded-md text-center border-2 border-solid border-black min-h-[200px] w-[100%]"
    >
      {property.color && (
        <div
          className="h-[25px] border-b-[3px] border-b-solid border-b-black"
          style={{ background: property.color }}
        ></div>
      )}
      <h4 className="font-bold text-xl mt-2">{property.name}</h4>
      <ul>
        <div className="font-semibold text-md">Rent with:</div>
        <div> 0 houses: {property.rent.oneHouse}</div>
        <div> 1 houses: {property.rent.twoHouses}</div>
        <div> 2 houses: {property.rent.threeHouses}</div>
        <div> 3 houses: {property.rent.fourHouses}</div>
        <b>Mortgage value: {property.mortgageValue}</b> <br/>
        <b>Redemption value: {property.redemptionValue}</b>
      </ul>
    </div>
  )
}

export function UtilityTitleDeed({
  property,
}: {
  property: UtilityProperty
}) {
  return (
    <div
      className="bg-primary-default text-primary-dark shadow-sm col-span-full row-span-full w-full  pb-4 text-center rounded-md text-center border-2 border-solid border-black min-h-[200px]"
    >
      <h4>{property.name}</h4>
      <ul>Rent</ul>
      <b>Mortgage value: {property.mortgageValue}</b> <br/>
      <b>Redemption value: {property.redemptionValue}</b>
    </div>
  )
}

export function StationTitleDeed({
  property,
}: {
  property: StationProperty
}) {
  return (
    <div
      className="bg-primary-default text-primary-dark shadow-sm col-span-full row-span-full w-full py-4 px-3 text-center rounded-md text-center border-2 border-solid border-black min-h-[200px]"
    >
      <h4 className="font-bold text-xl">{property.name}</h4>
      <ul>
        <div className="font-semibold text-md">Rent with:</div>
        <div>1 Station Owned: {property.rent.oneStationOwned}</div>
        <div>2 Stations Owned: {property.rent.twoStationsOwned}</div>
        <div>3 Stations Owned: {property.rent.threeStationsOwned}</div>
        <div>4 Stations Owned: {property.rent.fourStationsOwned}</div>
        <b>Mortgage value: {property.mortgageValue}</b> <br/>
        <b>Redemption value: {property.redemptionValue}</b>
      </ul>
    </div>
  )
}
