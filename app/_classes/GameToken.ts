export default class GameToken {
  owner: number
  name: string

  constructor(name: string, owner: number) {
    this.name = name
    this.owner = owner
  }
}
