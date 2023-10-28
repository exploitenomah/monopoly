import CardsContainer from "./CardsContainer"
import GameCard from "@/app/_classes/GameCard"
import CommunityChestCard from "./CommunityChestCard"

export default function CommunityChestContainer({
  cards,
}: {
  cards: GameCard[]
}) {
  return (
    <CardsContainer
      style={{ bottom: "15%", right: "8%", transform: "rotate(-45deg" }}
    >
      {cards.map((card, idx, arr) => (
        <CommunityChestCard
          key={card.id}
          card={card}
          zIndex={arr.length - idx}
        />
      ))}
    </CardsContainer>
  )
}
