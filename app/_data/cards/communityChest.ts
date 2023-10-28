import GameCard from "@/app/_classes/GameCard"
import {
  advanceToGo,
  bankErrorInFavour,
  doctorsFee,
  fromSaleOfStock,
  getOutOfJailFree,
  goToJail,
  holidayFundMatures,
  incomeTaxRefund,
  lifeInsuranceMatures,
  itsYourBirthday,
  payHospital,
  paySchoolFees,
  receiveConsultancyFee,
  assessedForStreetRepairs,
  secondPrizeInBeautyContest,
  inheritOneHundred,
} from "./communityChestActionHandlers"

const GameCardType = "COMMUNITY-CHEST"

const AdvanceToGo = new GameCard(
  "Advance Go (Collect 200)",
  advanceToGo,
  GameCardType,
  1
)

const BankErrorInFavour = new GameCard(
  "Bank error in your favour. Collect £200",
  bankErrorInFavour,
  GameCardType,
  2
)
const DoctorsFee = new GameCard(
  "Doctor's fee. Pay £50",
  doctorsFee,
  GameCardType,
  3
)
const FromSaleOfStock = new GameCard(
  "From sale of stock you get £50",
  fromSaleOfStock,
  GameCardType,
  4
)
const GetOutOfJailFree = new GameCard(
  "Get Out of Jail Free",
  getOutOfJailFree,
  GameCardType,
  5
)
const GoToJail = new GameCard("Get Out of Jail Free", goToJail, GameCardType, 6)

const HolidayFundMatures = new GameCard(
  "Holiday fund matures. Receive £100",
  holidayFundMatures,
  GameCardType,
  7
)
const IncomeTaxRefund = new GameCard(
  "Income tax refund. Collect £20",
  incomeTaxRefund,
  GameCardType,
  8
)
const ItsYourBirthday = new GameCard(
  "It is your birthday. Collect £10 from every player",
  itsYourBirthday,
  GameCardType,
  9
)
const LifeInsuranceMatures = new GameCard(
  "Life insurance matures. Collect £100",
  lifeInsuranceMatures,
  GameCardType,
  10
)
const PayHospital = new GameCard(
  "Pay hospital fees of £100",
  payHospital,
  GameCardType,
  11
)
const PaySchoolFees = new GameCard(
  "Pay school fees of £50",
  paySchoolFees,
  GameCardType,
  12
)
const ReceiveConsultancyFee = new GameCard(
  "Receive £25 consultancy fee",
  receiveConsultancyFee,
  GameCardType,
  13
)
const AssessedForStreetRepairs = new GameCard(
  "You are assessed for street repairs. £40 per house. £115 per hotel",
  assessedForStreetRepairs,
  GameCardType,
  14
)
const SecondPrizeInBeautyContest = new GameCard(
  "You have won second prize in a beauty contest. Collect £10",
  secondPrizeInBeautyContest,
  GameCardType,
  15
)
const InheritOneHundred = new GameCard(
  "You have won second prize in a beauty contest. Collect £10",
  inheritOneHundred,
  GameCardType,
  16
)

export default function generateCommunityChestCards() {
  return [
 AdvanceToGo,
  BankErrorInFavour,
  DoctorsFee,
  FromSaleOfStock,
  GetOutOfJailFree,
  GoToJail,
  HolidayFundMatures,
  IncomeTaxRefund,
  LifeInsuranceMatures,
  ItsYourBirthday,
  PayHospital,
  PaySchoolFees,
  ReceiveConsultancyFee,
  AssessedForStreetRepairs,
  SecondPrizeInBeautyContest,
  InheritOneHundred,
]
}

