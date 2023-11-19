import CardsContainer from "./CardsContainer"
import GameCard from "@/app/_classes/GameCard"
import CommunityChestCard from "./CommunityChestCard"
import { useAppDispatch } from "@/app/_redux/hooks"
import { playerAction } from "@/app/_redux/game.slice"

export default function CommunityChestContainer({
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
      style={{ bottom: "15%", right: "8%", transform: "rotate(-45deg" }}
    >
      {cards.map((card, idx, arr) => (
        <CommunityChestCard
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
