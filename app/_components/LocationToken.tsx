import { PlayerColor } from "../types"

const colors = {
  red: "pink",
  orange: "brown",
  yellow: "black",
  green: "crimson",
  blue: "#3cf8ff",
  indigo: "magenta",
  violet: "purple",
}
export default function LocationToken({
  color,
  position,
}: {
  color: PlayerColor
  position: number
}) {
  return (
    <div style={{ transform: getTransformation(position) }}>
      <div className="absolute w-full z-[90] scale-[0.5] md:scale-[1]">
        <div
          style={{
            background: color,
            border: `2px solid ${colors[color]}`,
            transform: "rotateX(-5deg) translateY(-130%) translateX(-10%)",
          }}
          className="w-[2.4rem] h-[2.4rem] absolute inset-0 z-[30] left-1/2 rounded-full hidden md:block"
        ></div>
        <div className="pin">
          <div
            style={{
              backgroundColor: color,
              color: colors[color as keyof typeof colors],
            }}
          >
            <div className="cube head">
              <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>
              <div className="four"></div>
              <div className="five"></div>
              <div className="six"></div>
            </div>
            <div className="neck"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getTransformation(position: number) {
  let rotation = 0
  if (position <= 9) return `rotate(${rotation}deg)`
  else if (position <= 10) rotation = 316
  else if (position <= 19) rotation = 239
  else if (position <= 20) rotation = 341
  else if (position <= 29) rotation = 180
  else if (position <= 30) rotation = 0
  else rotation = 90
  return `rotate(${rotation}deg)`
}
