type SpaceName =
  | "CHANCE"
  | "CHEST"
  | "JAIL"
  | "GO-TO-JAIL"
  | "GO"
  | "FREE-PARKING"
  | "INCOME-TAX"
  | "SUPER-TAX"

export default class Space {
  name: SpaceName
  constructor(name: SpaceName) {
    this.name = name
  }
}
