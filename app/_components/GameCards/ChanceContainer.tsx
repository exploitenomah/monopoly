import CardsContainer from "./CardsContainer"
import GameCard from "@/app/_classes/GameCard"
import ChanceCard from "./ChanceCard"

export default function ChanceContainer({ cards }: { cards: GameCard[] }) {
  return (
    <CardsContainer
      style={{ top: "15%", left: "8%", transform: "rotate(135deg" }}
    >
      {cards.map((card, idx, arr) => (
        <ChanceCard key={card.id} card={card} zIndex={arr.length - idx} />
      ))}
    </CardsContainer>
  )
}
