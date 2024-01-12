import CommunityChestContainer from "./GameCards/CommunityChestContainer"
import ChanceContainer from "./GameCards/ChanceContainer"
import Image from "next/image"
import { useMemo } from "react"
import BoardGame from "@/app/_classes/BoardGame"
import GameDiceContainer from "./GameDiceContainer"

export default function BoardCenter({
  game,
  advanceCurrentPlayer,
}: {
  advanceCurrentPlayer: (advancement: number, isDouble: boolean) => void
  game: BoardGame
}) {
  const currentPlayer = useMemo(() => {
    return game.players.find((it) => it.turn === game.currentTurn)
  }, [game.players, game.currentTurn])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-[76%] z-[300]">
      <CommunityChestContainer
        currentCard={game.currentChestCard}
        cards={game?.communityChestCards || []}
        currentPlayerId={currentPlayer?.id}
      />
      <Image
        src="/image-files/monopoly-logo.svg"
        alt="monopoly"
        width={300}
        height={100}
        className="z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] w-[80%] h-auto"
      />
      <div
        className={`${
          !game.currentChestCard && !game.currentChanceCard ? "z-[20]" : "z-[1]"
        } absolute w-full h-full flex items-center justify-center`}
      >
        <GameDiceContainer
          diceDisabled={(game.currentChestCard || game.currentChanceCard) ? true : false}
          advanceCurrentPlayer={advanceCurrentPlayer}
          currentPlayer={currentPlayer}
          game={game}
        />
      </div>
      <ChanceContainer
        currentCard={game.currentChanceCard}
        cards={game?.chanceCards || []}
        currentPlayerId={currentPlayer?.id}
      />
    </div>
  )
}


/* transform: 'rotate(45deg)'
transform: 'rotate3d(1, 1, -0.5, 45deg) rotate(45deg) rotateY(45deg) translateZ(400px) translateX(-350px)'*/