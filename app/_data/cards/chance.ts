import GameCard from "@/app/_classes/GameCard"
import {
  advanceToOilMillRoad,
  advanceToTransAmadi,
  advanceToGo,
  advanceToRumuosi,
  advanceToTheNearestStation,
  advanceToTheNearestUtility,
  bankPaysDividendOfFifty,
  getOutOfJailFree,
  goBackThreeSpaces,
  makeGeneralRepairs,
  speedingFine,
  takeATripToGIGMotors,
  chairmanOfTheBoard,
  buildingLoanMatures,
  xmasFundMatures,
  goToJail,
} from "./chanceActionHandlers"

const GameCardType = "CHANCE"
const AdvanceToGo = new GameCard(
  "Advance Go (Collect ₦200)",
  advanceToGo,
  GameCardType,
  1
)

const AdvanceToOilMillRoad = new GameCard(
  "Advance to Oil Mill Road, if you pass Go, collect ₦200",
  advanceToOilMillRoad,
  GameCardType,
  2
)
const AdvanceToTransAmadi = new GameCard(
  "Advance to Trans Amadi",
  advanceToTransAmadi,
  GameCardType,
  3
)
const AdvanceToRumuosi = new GameCard(
  "Advance to Rumuosi, if you pass Go, collect ₦200",
  advanceToRumuosi,
  GameCardType,
  4
)
const AdvanceToTheNearestStation = new GameCard(
  "Advance to the nearest Station. If unowned, you may buy it from the Bank. If owned, pay the rent amount due.",
  advanceToTheNearestStation,
  GameCardType,
  5
)
const AdvanceToTheNearestUtility = new GameCard(
  "Advance to the nearest Utility. If unowned, you may buy it from the Bank. If owned, pay the rent amount due.",
  advanceToTheNearestUtility,
  GameCardType,
  6
)
const BankPaysDividendOfFifty = new GameCard(
  "Bank pays you dividend of ₦50",
  bankPaysDividendOfFifty,
  GameCardType,
  7
)
const GetOutOfJailFree = new GameCard(
  "Get Out of Jail Free",
  getOutOfJailFree,
  GameCardType,
  8
)
const GoBackThreeSpaces = new GameCard(
  "Go Back 3 Spaces",
  goBackThreeSpaces,
  GameCardType,
  9
)
const MakeGeneralRepairs = new GameCard(
  "Make general repairs on all your property. For each house pay ₦25. For each hotel pay ₦100",
  makeGeneralRepairs,
  GameCardType,
  10
)
const SpeedingFine = new GameCard(
  "Speeding fine ₦15",
  speedingFine,
  GameCardType,
  11
)
const TakeATripToGIGMotors = new GameCard(
  "Take a trip to GIG Motors. If you pass Go, collect ₦200",
  takeATripToGIGMotors,
  GameCardType,
  12
)
const ChairmanOfTheBoard = new GameCard(
  "You have been elected Chairman of the Board. Pay each player ₦50",
  chairmanOfTheBoard,
  GameCardType,
  13
)
const BuildingLoanMatures = new GameCard(
  "Your building loan matures. Collect ₦150",
  buildingLoanMatures,
  GameCardType,
  14
)
const XmasFundMatures = new GameCard(
  "Your Xmas fund matures. Collect ₦100",
  xmasFundMatures,
  GameCardType,
  15
)
const GoToJail = new GameCard("Go to Jail", goToJail, GameCardType, 16)

export default function generateChanceCards() {
  return [
    AdvanceToGo,
    AdvanceToOilMillRoad,
    AdvanceToTransAmadi,
    AdvanceToRumuosi,
    AdvanceToTheNearestStation,
    AdvanceToTheNearestUtility,
    BankPaysDividendOfFifty,
    GetOutOfJailFree,
    GoBackThreeSpaces,
    MakeGeneralRepairs,
    SpeedingFine,
    TakeATripToGIGMotors,
    ChairmanOfTheBoard,
    BuildingLoanMatures,
    XmasFundMatures,
    GoToJail,
  ]
}
