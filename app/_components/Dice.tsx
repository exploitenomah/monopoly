import { useMemo, useRef, useCallback, useEffect } from "react"
import getRandomInteger from "../_utils/getRandomInteger"

const faces = {
  1: "-0.4,-0.9,-0.3,165deg",
  2: "0,0.5,0.3,90deg",
  3: "-0.1, 0.5,-0.2, 135deg",
  4: "0.5,-0.5,-1,165deg",
  5: "0,-0.5,-0.3,90deg",
  6: "0.2,-0.4,1,135deg",
}

export default function Dice({
  rollValue,
  isRolling,
  disabled,
}: {
  rollValue: number
  isRolling: boolean
  disabled: boolean
}) {
  const generatePositiveOrNegative = useCallback(() => {
    const sign = Math.random() < 0.5 ? -1 : 1
    return Math.random() * sign
  }, [])

  const diceRef = useRef<HTMLButtonElement | null>(null)
  const diceRotateValue = useMemo(() => {
    if (isNaN(rollValue)) return `-0.4,-0.9,-0.3,165deg`
    return faces[rollValue as keyof typeof faces]
  }, [rollValue])

  const animationOptions = useMemo(() => {
    return {
      duration: 500,
      iterations: 1,
    }
  }, [])

  const generateTransformValue = useCallback(() => {
    return {
      transform: `rotate3d(${generatePositiveOrNegative()}, ${generatePositiveOrNegative()}, ${generatePositiveOrNegative()}, ${getRandomInteger(
        45,
        270
      )}deg)`,
    }
  }, [generatePositiveOrNegative])

  const generateAnimationKeyFrames = useCallback(() => {
    return [
      generateTransformValue(),
      generateTransformValue(),
      generateTransformValue(),
      generateTransformValue(),
      generateTransformValue(),
      { transform: `perspective(1000px) rotate3d(${diceRotateValue})` },
    ]
  }, [diceRotateValue, generateTransformValue])

  useEffect(() => {
    if (diceRef.current && isRolling) {
      diceRef.current.animate(generateAnimationKeyFrames(), animationOptions)
    }
  }, [generateAnimationKeyFrames, animationOptions, isRolling])

  return (
    <>
      <button
        disabled={disabled}
        ref={diceRef}
        className={`${isRolling ? "rolling" : ""} dice`}
        style={{
          transform: `perspective(1000px) rotate3d(${diceRotateValue})`,
        }}
      >
        <span className={`${disabled ? "blur-[4px]" : ""}`} id="one">
          <span className="dot"></span>
        </span>
        <span className={`${disabled ? "blur-[4px]" : ""}`} id="two">
          <span className="dot"></span>
          <span className="dot"></span>
        </span>
        <span className={`${disabled ? "blur-[4px]" : ""}`} id="three">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </span>
        <span className={`${disabled ? "blur-[4px]" : ""}`} id="four">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </span>
        <span className={`${disabled ? "blur-[4px]" : ""}`} id="five">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </span>
        <span className={`${disabled ? "blur-[4px]" : ""}`} id="six">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </span>
      </button>
    </>
  )
}
