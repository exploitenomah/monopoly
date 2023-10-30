import Player from "./Player"
type SpaceType =
  | "CHANCE"
  | "COMMUNITY-CHEST"
  | "JAIL"
  | "GO-TO-JAIL"
  | "GO"
  | "FREE-PARKING"
  | "INCOME-TAX"
  | "SUPER-TAX"

export default class Space {
  public type: SpaceType
  public id: string
  public contents: Player[] = []

  constructor(id: string, type: SpaceType) {
    this.type = type
    this.id = id
  }
  public static revive(objectLikeSpace: Space) {
    const { id, type, contents } = objectLikeSpace
    const revivedSpace = new Space(id, type)
    revivedSpace.contents = contents.map((content) => Player.revive(content))
    return revivedSpace
  }
}
