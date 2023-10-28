import { useState } from "react"
import GameCard from "../_classes/GameCard"
import shuffleArray from "@/app/_utils/shuffleArray"

export default function useGameCardsManager(initialCards: GameCard[]) {
  const [gameCards, setGameCards] = useState(() => shuffleArray(initialCards))
  return gameCards
}
