export interface GameDetails {
  name: string
  id: string
  password: string
  totalPlayers: number
}
export type PlayerColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  |"indigo"
  | "violet"

export type PlayerDetail = {
  name: string
  color: PlayerColor
  rollValue: number
}
