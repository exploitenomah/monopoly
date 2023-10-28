import Player from "./Player"
import { chanceIdMapping } from "../_data/cards/chanceActionHandlers"
import { communityChestIdMapping } from "../_data/cards/communityChestActionHandlers"

type Action = (playerId: number, otherPlayers: Player[]) => Player[]

type CardType = "COMMUNITY-CHEST" | "CHANCE"

export default class GameCard {
  public content: string
  public handleAction: Action
  public type: CardType
  public id: number

  constructor(content: string, action: Action, type: CardType, id: number) {
    this.content = content
    this.handleAction = action
    this.type = type
    this.id = id
  }

  public static revive(objectLikeGameCard: GameCard) {
    const { content, type, id } = objectLikeGameCard
    const action =
      type === "COMMUNITY-CHEST"
        ? communityChestIdMapping[id as keyof typeof communityChestIdMapping]
        : chanceIdMapping[id as keyof typeof chanceIdMapping]
    const revived = new GameCard(content, action, type, id)
    return revived
  }
}
