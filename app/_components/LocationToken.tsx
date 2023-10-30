import { PlayerColor } from "../types"
//colors[color as keyof typeof colors]
const colors = {
  red: "",
  orange: "brown",
  yellow: "",
  green: "crimson",
  blue: "",
  indigo: "",
  violet: "purple",
}
export default function LocationToken({ color }: { color: PlayerColor }) {
  return (
    <div className="">
      <div className="absolute w-full">
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
