import CardsContainer from "./CardsContainer"
import GameCard from "@/app/_classes/GameCard"
import ChanceCard from "./ChanceCard"
import { useAppDispatch } from "@/app/_redux/hooks"
import { playerAction } from "@/app/_redux/game.slice"
import BoardGame from "@/app/_classes/BoardGame"
import Player from "@/app/_classes/Player"
import toast from "react-hot-toast"
import { chanceIdMapping } from "@/app/_data/cards/chanceActionHandlers"

export default function ChanceContainer({
  cards,
  currentCard,
  currentPlayer,
  game
}: {
  cards: GameCard[]
  currentCard: {
    card: GameCard
    owner: number
  } | null
  currentPlayer?: Player
  game: BoardGame
}) {
  const appDispatch = useAppDispatch()
  return (
    <CardsContainer
      style={{ top: "15%", left: "8%", transform: "rotate(135deg", zIndex: 1 }}
    >
      {cards.map((card, idx, arr) => (
        <ChanceCard
          handleDone={() => {
            const toastMessage = chanceIdMapping[card.id as keyof typeof chanceIdMapping].getToastMessage(currentPlayer as Player, game)
            typeof currentPlayer?.id === "number" &&
              appDispatch(playerAction(currentPlayer.id))
            toast.success(toastMessage)
          }}
          key={card.id}
          card={card}
          zIndex={arr.length - idx}
          isCurrent={currentCard !== null && currentCard.card.id === card.id}
        />
      ))}
    </CardsContainer>
  )
}
