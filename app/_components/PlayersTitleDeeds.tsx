import BoardGame from "../_classes/BoardGame"
import { useMemo, useState } from "react"
import TitleDeedsContainer from "./TitleDeeds/TitleDeedsContainer"
import HousingProperty from "../_classes/HousingProperty"
import StationProperty from "../_classes/StationProperty"
import UtilityProperty from "../_classes/UtilityProperty"

export default function PlayersTitleDeeds({ game }: { game: BoardGame | null }) {
  const [showTitleDeeds, setShowTitleDeeds] = useState(false)
  const allProperties = useMemo(() => {
    return BoardGame.flattenPropertiesAndRemoveSpaces(game)
  }, [game])

  const sortedPlayerPropertiesObject = useMemo(() => {
    return allProperties.reduce((acc: { [x: number]: [HousingProperty | StationProperty | UtilityProperty] }, curr) => {
      let current = curr as HousingProperty | StationProperty | UtilityProperty
      if (current.owner !== null) {
        if (acc[current.owner]) acc[current.owner].push(current)
        else acc[current.owner] = [current]
      }
      return acc
    }, {})
  }, [allProperties])

  const titleDeeds = useMemo(() => (Object.entries(sortedPlayerPropertiesObject).map(([key, value]) => (
    <TitleDeedsContainer
      player={game?.players.find((it) => it.id === Number(key))}
      properties={value}
    />
  )
  )), [sortedPlayerPropertiesObject, game?.players])

  if (!game) return null
  return (
    <div className="w-full p-4">
      <button className="capitalize bg-primary-dark/90 text-primary-default rounded-lg px-4 py-3 font-medium text-lg" onClick={() => setShowTitleDeeds(prev => !prev)}>{ showTitleDeeds ? "hide" : "show" } title deeds</button>
      {titleDeeds.some(it => it.props.properties.length > 0) && showTitleDeeds &&
        <ul className="px-4 py-6 overflow-x-auto flex flex-wap gap-5 sticky top-0">
          {titleDeeds}
        </ul>}
    </div>
  )
}
