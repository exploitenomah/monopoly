import Player from "./Player"

type Action = (
  actionName: string,
  playerId: number,
  otherPlayers: Player[],
  ...rest: number[]
) => Player | Player[]

type CardType = "CHEST" | "CHANCE"

export default class GameCard {
  name: string
  action: Action
  type: CardType
  constructor(actionName: string, action: Action, type: CardType) {
    this.name = actionName
    this.action = action
    this.type = type
  }
}
