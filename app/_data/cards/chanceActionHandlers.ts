import BoardGame from "@/app/_classes/BoardGame"
import { Action } from "@/app/_classes/GameCard"
import Player from "@/app/_classes/Player"
import StationProperty from "@/app/_classes/StationProperty"
import UtilityProperty from "@/app/_classes/UtilityProperty"
import { findNearestStationPositionToPlayerCurrentPosition, findNearestUtilityPosition, getPropertyByPosition } from "@/app/_utils/game"

export const advanceToOilMillRoad = Object.assign(function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      if (player.currentPosition >= 24)
        game.advancePlayer(40 - player.currentPosition + 24, false)
      else
        game.advancePlayer(
          24 - player.currentPosition,
          player.prevRollWasDouble
        )
      game.handleLandingOnPosition(player)
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} advances to Oil Mill road`
  }
})

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

export const advanceToTransAmadi = Object.assign(function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      game.advancePlayer(39 - player.currentPosition, player.prevRollWasDouble)
      game.handleLandingOnPosition(player)
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} advances to Trans Amadi`
  }
})

export const advanceToRumuosi = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      if (player.currentPosition >= 11)
        game.advancePlayer(40 - player.currentPosition + 11, false)
      else
        game.advancePlayer(
          11 - player.currentPosition,
          player.prevRollWasDouble
        )
      game.handleLandingOnPosition(player)
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} advances to Rumuosi`
  }
})

export const advanceToTheNearestStation = Object.assign(function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      const nearestStationPosition = findNearestStationPositionToPlayerCurrentPosition(player)
      game.advancePlayer(
        nearestStationPosition - player.currentPosition,
        player.prevRollWasDouble
      )
      game.handleLandingOnPosition(player)
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    const nearestStationPosition = findNearestStationPositionToPlayerCurrentPosition(currentPlayer as Player)
    const nearestStationProperty = getPropertyByPosition(nearestStationPosition)
    return `${currentPlayer?.name} advances to ${(nearestStationProperty as StationProperty)?.name} Station`
  }
})

export const advanceToTheNearestUtility = Object.assign(function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      const nearestUtility = findNearestUtilityPosition(player)
      game.advancePlayer(
        nearestUtility - player.currentPosition,
        player.prevRollWasDouble
      )
      game.handleLandingOnPosition(player)
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    const nearestUtilityPosition = findNearestUtilityPosition(currentPlayer as Player)
    const nearestUtilityProperty = getPropertyByPosition(nearestUtilityPosition)
    return `${currentPlayer?.name} advances to ${(nearestUtilityProperty as UtilityProperty)?.name} Utility`
  }
})

export const bankPaysDividendOfFifty = Object.assign(function(
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance += 50
    }
  })
  return game
}, { 
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives a dividend of ₦50`
  } 
}) 

export const getOutOfJailFree = Object.assign(function (game: BoardGame, playerId: number) {
  game.chanceCards = game.chanceCards.filter(
    (it) => it.content.toLowerCase() !== "Get Out Of Jail Free".toLowerCase()
  )
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.getOutOfJailCards.chance = game.currentChanceCard?.card || null
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} just got a Get Out Of Jail Free card from chance`
  }
})

export const goBackThreeSpaces = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      game.regressPlayer(3, player.prevRollWasDouble)
      game.handleLandingOnPosition(player)
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} goes back 3 spaces`
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

export const makeGeneralRepairs = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      const costOfHouseRepairs = player.totalHousesOwned * 25
      const costOfHotelRepairs = player.totalHotelsOwned * 100// player property/method
      player.accountBalance -= costOfHouseRepairs + costOfHotelRepairs
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    const costOfHouseRepairs = (currentPlayer?.totalHousesOwned || 0) * 25
    const costOfHotelRepairs = (currentPlayer?.totalHotelsOwned || 0) * 100
    return `${currentPlayer?.name} pays ₦${costOfHotelRepairs + costOfHouseRepairs} for street repairs`
  }
})

export const speedingFine = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      player.accountBalance -= 15
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} pays ₦15 for speeding`
  }
})

export const takeATripToGIGMotors = Object.assign(function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player) => {
    if (player.id === playerId) {
      if (player.currentPosition >= 35)
        game.advancePlayer(40 - player.currentPosition + 35, false)
      else
        game.advancePlayer(
          35 - player.currentPosition,
          player.prevRollWasDouble
        )
      game.handleLandingOnPosition(player)
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} advances to GIG Motors`
  }
})

export const chairmanOfTheBoard = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player, _idx, players) => {
    if (player.id === playerId) {
      player.accountBalance -= players.length * 50
    } else {
      player.accountBalance += 50
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} is now chairman of the board and pays ₦50 to each player`
  }
})

export const buildingLoanMatures = Object.assign(function (
  game: BoardGame,
  playerId: number
) {
  game.players.forEach((player, _idx, players) => {
    if (player.id === playerId) {
      player.accountBalance += 150
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} receives ₦150 for matured building loan`
  }
})

export const xmasFundMatures = Object.assign(function (game: BoardGame, playerId: number) {
  game.players.forEach((player, _idx, players) => {
    if (player.id === playerId) {
      player.accountBalance += 100
    }
  })
  return game
}, {
  getToastMessage: (currentPlayer?: Player, currentGame?: BoardGame) => {
    return `${currentPlayer?.name} pays ₦100 for maturity of xmas fund`
  }
})

export const chanceIdMapping: { [x:string]: Action} = {
  1: advanceToGo,
  2: advanceToOilMillRoad,
  3: advanceToTransAmadi,
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
