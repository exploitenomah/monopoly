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
  type: SpaceType
  constructor(type: SpaceType) {
    this.type = type
  }
}
