import { useState, useCallback, useMemo } from "react"
import { PlayerColor, PlayerDetail } from "../types"
import Form from "./InitializationForm"
import Finalization from "./InitializationFinalization"
import InitializationInfo from "./InitializationDefault"

export default function Initialization({
  totalPlayers,
  finalize,
}: {
  totalPlayers: number
  finalize: (playersDetails: PlayerDetail[]) => void
}) {
  const [highestRoller, setHighestRoller] = useState<PlayerDetail | null>(null)
  const [currentPosition, setCurrentPosition] = useState(1)
  const [isInitializationStarted, setIsInitializationStarted] = useState(false)
  const [playersDetails, setPlayersDetails] = useState<PlayerDetail[]>([])
  const [isATie, setIsATie] = useState(false)
  const [takenNames, setTakenNames] = useState<string[]>([])
  const colorOptions = useMemo(() => {
    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
    ]
    return colors.filter(
      (color) =>
        playersDetails.find((player) => player.color === color) === undefined
    ) as PlayerColor[]
  }, [playersDetails])

  const handlePlayerDetailSubmission = useCallback(
    (playerDetail: PlayerDetail) => {
      if (!highestRoller || highestRoller.rollValue <= playerDetail.rollValue) {
        setHighestRoller(playerDetail)
        if (highestRoller && highestRoller.rollValue === playerDetail.rollValue)
          setIsATie(true)
        else setIsATie(false)
      }
      setTakenNames((prev) => [...prev, playerDetail.name.toLowerCase()])
      setPlayersDetails((prev) => [...prev, playerDetail])
      setCurrentPosition((prev) => prev + 1)
    },
    [highestRoller]
  )
  return (
    <div className="bg-primary-default text-primary-dark rounded-lg px-6 py-12 w-[95vw] max-w-[580px] min-h-[600px]">
      {currentPosition > totalPlayers && (
        <Finalization
          isATie={isATie}
          players={playersDetails}
          highestRoller={highestRoller}
          finalize={() => finalize(playersDetails)}
          restart={() => {
            setCurrentPosition(1)
            setPlayersDetails([])
            setIsInitializationStarted(true)
            setHighestRoller(null)
          }}
        />
      )}
      {currentPosition <= totalPlayers &&
        (isInitializationStarted ? (
          <Form
            handlePlayerDetail={handlePlayerDetailSubmission}
            colorOptions={colorOptions}
            currentPlayer={currentPosition}
            takenNames={takenNames}
          />
        ) : (
          <InitializationInfo
            startInitialization={() => setIsInitializationStarted(true)}
          />
        ))}
    </div>
  )
}
