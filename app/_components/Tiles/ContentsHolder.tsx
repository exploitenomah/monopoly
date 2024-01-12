import Player from "@/app/_classes/Player"
import LocationToken from "../LocationToken"
import { PlayerColor } from "../../types"
import { useMemo } from "react"

export default function ContentsHolder({
  contents,
  position,
}: {
  contents: Player[]
  position: number
}) {
  
  const sortedContents = useMemo(() => {
    return [...contents].sort((a, b) => a.name.localeCompare(b.name))
  }, [contents])

  return (
    <div className="absolute inset-0 z-[99999] bg-transparent flex justify-around flex-wrap">
      {sortedContents.map((content) => (
        <LocationToken
          position={position}
          key={content.id}
          color={content.color as PlayerColor}
        />
      ))}
    </div>
  )
}
