import BoardGame from "@/app/_classes/BoardGame"

export const advanceToOilMillRoad = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      if (player.currentPosition >= 24)
        game.advancePlayer(40 - player.currentPosition + 24, false)
      else game.advancePlayer(24 - player.currentPosition, false)
    }
  })
  return game
}

export const advanceToGo = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      console.log(player.id)
      game.advancePlayer(40 - player.currentPosition, false)
    }
  })
  return game
}

export const advanceToTransAmadi = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      game.advancePlayer(39 - player.currentPosition, false)
    }
  })
  return game
}

export const advanceToRumuosi = function (game: BoardGame, playerId: number) {
  return game
}
export const advanceToTheNearestStation = function (
  game: BoardGame,
  playerId: number
) {
  return game
}
export const advanceToTheNearestUtility = function (
  game: BoardGame,
  playerId: number
) {
  return game
}
export const bankPaysDividendOfFifty = function (game: BoardGame, playerId: number) {
  return game
}
export const getOutOfJailFree = function (game: BoardGame, playerId: number) {
  return game
}
export const goBackThreeSpaces = function (game: BoardGame, playerId: number) {
  return game
}
export const goToJail = function (game: BoardGame, playerId: number) {
  return game
}
export const makeGeneralRepairs = function (game: BoardGame, playerId: number) {
  return game
}
export const speedingFine = function (game: BoardGame, playerId: number) {
  return game
}
export const takeATripToGIGMotors = function (game: BoardGame, playerId: number) {
  return game
}
export const chairmanOfTheBoard = function (game: BoardGame, playerId: number) {
  return game
}
export const buildingLoanMatures = function (game: BoardGame, playerId: number) {
  return game
}
export const xmasFundMatures = function (game: BoardGame, playerId: number) {
  return game
}

export const chanceIdMapping = {
  1: advanceToOilMillRoad,
  2: advanceToTransAmadi,
  3: advanceToGo,
  4: advanceToRumuosi,
  5: advanceToTheNearestStation,
  6: advanceToTheNearestUtility,
  7: bankPaysDividendOfFifty,
  8: getOutOfJailFree,
  9: goBackThreeSpaces,
  10: makeGeneralRepairs,
  11: speedingFine,
  12: takeATripToGIGMotors,
  13: chairmanOfTheBoard,
  14: buildingLoanMatures,
  15: xmasFundMatures,
  16: goToJail,
}
