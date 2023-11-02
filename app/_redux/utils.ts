import BoardGame from "@/app/_classes/BoardGame"

export function copyBoardGame(game: BoardGame) {
  return BoardGame.revive(JSON.parse(JSON.stringify(game)))
}
