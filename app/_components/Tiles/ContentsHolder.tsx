import Player from "@/app/_classes/Player"
import LocationToken from "../LocationToken"
import { PlayerColor } from "../../types"

export default function ContentsHolder({ contents }: { contents: Player[] }) {
  return (
    <div className="absolute inset-0 z-10 bg-transparent flex justify-around flex-wrap">
      {contents.map((content) => (
        <LocationToken key={content.id} color={content.color as PlayerColor} />
      ))}
    </div>
  )
}
