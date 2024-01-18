import CardsContainer from "./CardsContainer"
import GameCard from "@/app/_classes/GameCard"
import CommunityChestCard from "./CommunityChestCard"
import { useAppDispatch } from "@/app/_redux/hooks"
import { playerAction } from "@/app/_redux/game.slice"
import BoardGame from "@/app/_classes/BoardGame"
import Player from "@/app/_classes/Player"
import { communityChestIdMapping } from "@/app/_data/cards/communityChestActionHandlers"
import toast from "react-hot-toast"

export default function CommunityChestContainer({
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
      style={{
        bottom: "15%",
        right: "8%",
        transform: "rotate(-45deg)",
        zIndex: 2,
      }}
    >
      {cards.map((card, idx, arr) => (
        <CommunityChestCard
          handleDone={() => {
            const toastMessage = communityChestIdMapping[card.id as keyof typeof communityChestIdMapping].getToastMessage(currentPlayer as Player, game)           
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
