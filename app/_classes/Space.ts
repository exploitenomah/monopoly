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
  public position?: number

  constructor(id: string, type: SpaceType) {
    this.type = type
    this.id = id
  }
  public setPosition(position: number) {
    this.position = position
    return this
  }
  public static revive(objectLikeSpace: Space) {
    const { id, type, contents, position } = objectLikeSpace
    const revivedSpace = new Space(id, type)
    revivedSpace.setPosition(position as number)
    revivedSpace.contents = contents.map((content) => Player.revive(content))
    return revivedSpace
  }
}
