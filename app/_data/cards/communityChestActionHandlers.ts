import BoardGame from "@/app/_classes/BoardGame"

export const advanceToGo = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      game.advancePlayer(40 - player.currentPosition, player.prevRollWasDouble)
      game.handleLandingOnPosition(player)
    }
  })
  return game
}

export const bankErrorInFavour = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 200
    }
  })
  return game
}

export const doctorsFee = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance -= 50
    }
  })
  return game
}

export const fromSaleOfStock = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 50
    }
  })
  return game
}

export const getOutOfJailFree = function (game: BoardGame, playerId: number) {
  return game
}

export const goToJail = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.isInJail = true
    }
  })
  return game
}

export const holidayFundMatures = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 100
    }
  })
  return game
}

export const incomeTaxRefund = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 200
    }
  })
  return game
}

export const lifeInsuranceMatures = function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 100
    }
  })
  return game
}

export const itsYourBirthday = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 10 * game.players.length
    } else {
      player.accountBalance -= 10
    }
  })
  return game
}

export const payHospital = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance -= 100
    }
  })
  return game
}

export const paySchoolFees = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance -= 150
    }
  })
  return game
}

export const receiveConsultancyFee = function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 25
    }
  })
  return game
}

export const assessedForStreetRepairs = function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      const costOfHouseRepairs = player.totalHousesOwned * 40
      const costOfHotelRepairs = player.totalHotelsOwned * 115
      player.accountBalance -= costOfHouseRepairs + costOfHotelRepairs
    }
  })
  return game
}

export const secondPrizeInBeautyContest = function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 10
    }
  })
  return game
}

export const inheritOneHundred = function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 100
    }
  })
  return game
}

export const communityChestIdMapping = {
  1: advanceToGo,
  2: bankErrorInFavour,
  3: doctorsFee,
  4: fromSaleOfStock,
  5: getOutOfJailFree,
  6: goToJail,
  7: holidayFundMatures,
  8: incomeTaxRefund,
  9: lifeInsuranceMatures,
  10: itsYourBirthday,
  11: payHospital,
  12: paySchoolFees,
  13: receiveConsultancyFee,
  14: assessedForStreetRepairs,
  15: secondPrizeInBeautyContest,
  16: inheritOneHundred,
}
