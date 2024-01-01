import Player from "../../_classes/Player"
import HousingProperty from "../../_classes/HousingProperty"
import StationProperty from "../../_classes/StationProperty"
import UtilityProperty from "../../_classes/UtilityProperty"
import {
  HousingTitleDeed,
  UtilityTitleDeed,
  StationTitleDeed,
} from "./TitleDeed"
import SwiperCards from "../Swiper/CardDeck"

export const TitleDeeds = {
  HOUSING: HousingTitleDeed,
  UTILITY: UtilityTitleDeed,
  STATION: StationTitleDeed,
}
export default function TitleDeedsContainer({
  player,
  properties,
}: {
  player?: Player
  properties: (HousingProperty | StationProperty | UtilityProperty)[]
}) {
  return (
    <li className="text-center grow basis-[100%] shrink-0 max-w-[300px]">
      <h2 className="text-primary-dark font-bold capitalize text-2xl mb-4">
        {player?.name}
      </h2>
      <button className="mb-4 bg-primary-dark/60 px-3 py-2 block mx-auto rounded-lg text-lg capitalize font-bold text-white">view all</button>
      <div>
        <SwiperCards
        >
          {properties.map((property) => {
            const Component = TitleDeeds[property.type as keyof typeof TitleDeeds]
            return (
              <Component
                property={property as any}
                key={property.id}
              />
            )
          })}
        </SwiperCards>
      </div>
    </li>
  )
}
