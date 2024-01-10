import { useCallback, useMemo } from "react";
import HousingProperty from "../_classes/HousingProperty";
import Player from "../_classes/Player";
import StationProperty from "../_classes/StationProperty";
import UtilityProperty from "../_classes/UtilityProperty";
import BoardGame, {
  chanceTiles,
  communityChestTiles,
} from "../_classes/BoardGame";


const playerActionInfoTexts = {
  "EMPTY": () => ({
    infoText: "",
    toastText: {
      accept: "",
      decline: ""
    }
  }),
  "SUPER-TAX": (name: string) => ({
    infoText: `${name}, You have recieved the super tax of ₦100`,
    toastText: {
      accept: `${name} has been taxed ₦100 for super tax`,
      decline: ``
    }
  }),
  "INCOME-TAX": (name: string) => ({
    infoText: `${name}, You have recieved the income tax of ₦200`,
    toastText: {
      accept: `${name} has been taxed ₦200 for income tax`,
      decline: ``,
    }
  }),
  "PAY-RENT": (payer?: string, payee?: string, rentAmount?: number) => ({
    infoText: `${payer}, you will now pay a rent amount of ₦${rentAmount} to ${payee}`,
    toastText: {
      accept: `${payer}, just paid a rent of ₦${rentAmount} to ${payee}`,
      decline: ``
    }
  }),
  "BUY-PROPERTY": (buyer?: string, propertyName?: string) => ({
    infoText: `${buyer}, you have landed on ${propertyName}. It is unbought. Would you like to purchase it?`, 
    toastText: {
      accept: `${buyer}, just bought ${propertyName}`,
      decline: `${buyer}, declined to purchase ${propertyName}, it is up for bidding`
    }
  }),
  "OWNER": () => ({
    infoText: "Because you own this property, you do not pay rent. You can either transact or pass onto the next turn",
    toastText: {
      accept: ``,
      decline: ``
    }
  })
}

function generateToastAndInfoTexts({ currentPlayer, currentPositionProperty, calculateRentAmount, payee, text }: {
  currentPlayer?: Player
  currentPositionProperty: HousingProperty | UtilityProperty | StationProperty,
  calculateRentAmount: () => number
  payee?: string,
  text: "infoText" | "toastText"
}) {
  if (!currentPlayer) return playerActionInfoTexts["EMPTY"]()[text]
  if (chanceTiles.includes(currentPlayer.currentPosition)) return playerActionInfoTexts["EMPTY"]()[text];
  else if (communityChestTiles.includes(currentPlayer.currentPosition)) return playerActionInfoTexts["EMPTY"]()[text]
  else if (currentPlayer.currentPosition === 38)
    return playerActionInfoTexts["SUPER-TAX"](currentPlayer.name)[text]
  else if (currentPlayer.currentPosition === 4)
    return playerActionInfoTexts["INCOME-TAX"](currentPlayer.name)[text]
  else {
    if (
      currentPositionProperty &&
      !chanceTiles.includes(currentPositionProperty?.position as number) &&
      !communityChestTiles.includes(
        currentPositionProperty?.position as number,
      )
    ) {
      if (
        currentPositionProperty?.owner !== null &&
        currentPositionProperty?.owner !== currentPlayer.id
      ) {
        const rentAmount = calculateRentAmount()
        return playerActionInfoTexts["PAY-RENT"](currentPlayer.name, payee, rentAmount)[text]
      } else if (currentPositionProperty?.owner === null) {
        return playerActionInfoTexts["BUY-PROPERTY"](currentPlayer.name, currentPositionProperty?.name)[text]
      } else if (
        currentPositionProperty?.owner !== null &&
        currentPositionProperty?.owner === currentPlayer.id
      )
        return playerActionInfoTexts["OWNER"]()[text];
    }
    else return playerActionInfoTexts["OWNER"]()[text];
  }
  return playerActionInfoTexts["EMPTY"]()[text]
}

let lines = {
  1: "LineOne",
  2: "LineTwo",
  3: "LineThree",
  4: "LineFour",
};

export default function useGeneratePlayerActionText({
  currentPlayer,
  game,
  rollValue,
  currentPositionProperty
}: {
  currentPlayer?: Player;
  game: BoardGame;
  rollValue: number
  currentPositionProperty:  HousingProperty | UtilityProperty | StationProperty
}) {
  const currentLineOfProperties = useMemo(() => {
    return Math.ceil(
      (currentPositionProperty?.position as number) / 10,
    ) as keyof typeof lines;
  }, [currentPositionProperty?.position])

  const calculateRentAmount = useCallback(() => {
    return BoardGame.calculatePropertyRent(
      currentPositionProperty,
      game.properties[
      currentLineOfProperties as keyof typeof game.properties
      ] as (HousingProperty | UtilityProperty | StationProperty)[],
      rollValue,
    )
  }, [game?.properties, currentLineOfProperties, currentPositionProperty, rollValue])

  const infoText = useMemo(() => {
    return generateToastAndInfoTexts({ 
      currentPlayer, 
      currentPositionProperty, 
      calculateRentAmount, 
      payee: game.players.find(it => it.id === currentPositionProperty?.owner)?.name,
      text: "infoText" 
   }).toString()
  }, [currentPlayer, currentPositionProperty, game?.players, calculateRentAmount]);

  const toastText = useMemo(() => { 
    return generateToastAndInfoTexts({
      currentPlayer,
      currentPositionProperty,
      calculateRentAmount,
      payee: game.players.find(it => it.id === currentPositionProperty?.owner)?.name,
      text: "toastText"
    })
  }, [currentPlayer, currentPositionProperty, calculateRentAmount, game.players])

  return {
    infoText,
    toastText
  }
}