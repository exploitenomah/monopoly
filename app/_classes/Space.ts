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
  constructor(id: string, type: SpaceType) {
    this.type = type
    this.id = id
  }
  public static revive(objectLikeSpace: Space) {
    const { id , type } = objectLikeSpace
    return new Space(id, type)
  }
}
