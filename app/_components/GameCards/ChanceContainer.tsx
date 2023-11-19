import CardsContainer from "./CardsContainer"
import GameCard from "@/app/_classes/GameCard"
import ChanceCard from "./ChanceCard"
import { useAppDispatch } from "@/app/_redux/hooks"
import { playerAction } from "@/app/_redux/game.slice"

export default function ChanceContainer({
  cards,
  currentCard,
  currentPlayerId,
}: {
  cards: GameCard[]
  currentCard: {
    card: GameCard
    owner: number
  } | null
  currentPlayerId?: number
}) {
  const appDispatch = useAppDispatch()
  return (
    <CardsContainer
      style={{ top: "15%", left: "8%", transform: "rotate(135deg" }}
    >
      {cards.map((card, idx, arr) => (
        <ChanceCard
          handleDone={() =>
            typeof currentPlayerId === "number" &&
            appDispatch(playerAction(currentPlayerId))
          }
          key={card.id}
          card={card}
          zIndex={arr.length - idx}
          isCurrent={currentCard !== null && currentCard.card.id === card.id}
        />
      ))}
    </CardsContainer>
  )
}
