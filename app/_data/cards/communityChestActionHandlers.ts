import BoardGame from "@/app/_classes/BoardGame"
import { Action } from "@/app/_classes/GameCard"
import Player from "@/app/_classes/Player"

export const advanceToGo = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      game.advancePlayer(40 - player.currentPosition, player.prevRollWasDouble)
      game.handleLandingOnPosition(player)
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} advances to Go and receives ₦200`
  }
})

export const bankErrorInFavour = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 200
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives ₦200 from Bank error in favour.`
  }
})

export const doctorsFee = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance -= 50
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} pays ₦50 for Doctor's fee`
  }
})

export const fromSaleOfStock = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 50
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives ₦50 from sale of stock`
  }
})

export const getOutOfJailFree = Object.assign(function (game: BoardGame, playerId: number) {
  game.communityChestCards = game.communityChestCards.filter(
    (it) => it.content.toLowerCase() !== "Get Out Of Jail Free".toLowerCase()
  )
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.getOutOfJailCards.communityChest = game.currentChestCard?.card || null
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} just got a Get Out Of Jail Free card from the community chest`
  }
})

export const goToJail = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.isInJail = true
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} goes to jail`
  }
})

export const holidayFundMatures = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 100
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives ₦100 from holiday fund maturity`
  }
})

export const incomeTaxRefund = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 200
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives an income tax refund of ₦200`
  }
})

export const lifeInsuranceMatures = Object.assign(function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 100
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives ₦100; Life insurance matures`
  }
})

export const itsYourBirthday = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 10 * game.players.length
    } else {
      player.accountBalance -= 10
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives ₦${(currentGame?.players.length || 1) * 100} as a birthday gift from everyone`
  }
})

export const payHospital = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance -= 100
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} pays a hospital bill of ₦100`
  }
})

export const paySchoolFees = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance -= 150
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} pays ₦${150} for school fees`
  }
})

export const receiveConsultancyFee = Object.assign(function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 25
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives ₦25 consultation fee`
  }
})

export const assessedForStreetRepairs = Object.assign(function (
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
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    const costOfHouseRepairs = (currentPlayer?.totalHousesOwned || 0) * 40
    const costOfHotelRepairs = (currentPlayer?.totalHotelsOwned || 0) * 115
    return `${currentPlayer?.name} pays ₦${costOfHotelRepairs + costOfHouseRepairs} for street repairs`
  }
})

export const secondPrizeInBeautyContest = Object.assign(function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 10
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives ₦10 prize for winning beauty contest`
  }
})

export const inheritOneHundred = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 100
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives ₦100 as inheritance`
  }
})

export const communityChestIdMapping: { [x: number]: Action} = {
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
