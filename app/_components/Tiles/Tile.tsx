import HousingTile from "./HousingTile"
import UtilityTile from "./UtilityTile"
import StationTile from "./StationTile"
import IncomeTaxTile from "./IncomeTaxTile"
import SuperTaxTile from "./SuperTaxTile"
import ChanceTile from "./ChanceTile"
import CommunityChestTile from "./CommunityChestTile"
import ContentsHolder from "./ContentsHolder"
import { TileContent } from "@/app/_classes/Tile"

const tiles = {
  HOUSING: HousingTile,
  UTILITY: UtilityTile,
  STATION: StationTile,
  "INCOME-TAX": IncomeTaxTile,
  "SUPER-TAX": SuperTaxTile,
  CHANCE: ChanceTile,
  "COMMUNITY-CHEST": CommunityChestTile,
}

export default function Tile({
  content,
  tileId,
}: {
  content: TileContent
  tileId: string
}) {
  const TileTypeComponent = tiles[content.type as keyof typeof tiles]

  return (
    <div className="w-full break-all text-center text-primary-dark font-bold text-[0.25rem] md:text-[0.6rem] lg:text-[0.8rem]">
      <TileTypeComponent classType={content as any} />
      <ContentsHolder contents={content.contents}/>
    </div>
  )
}
