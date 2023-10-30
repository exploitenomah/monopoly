import { useState, useCallback } from "react"
import getRandomInteger from "../_utils/getRandomInteger"

export default function useDice(millisecondsToRollFor?: number) {
  const [rollValue, setRollValue] = useState(NaN)
  const [isRolling, setIsRolling] = useState(false)

  const roll = useCallback(() => {
    setIsRolling(true)
    setTimeout(() => {
      setRollValue(getRandomInteger(1, 6))
      setIsRolling(false)
    }, millisecondsToRollFor || 3000)
  }, [millisecondsToRollFor])

  const reset = useCallback(() => {
    setRollValue(NaN)
  }, [])

  return {
    rollValue,
    roll,
    isRolling,
    reset,
  }
}
