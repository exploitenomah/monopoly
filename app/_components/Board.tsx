import LineOne from "./Lines/LineOne"
import LineTwo from "./Lines/LineTwo"
import LineThree from "./Lines/LineThree"
import LineFour from "./Lines/LineFour"
import Go from "./Spaces/Go"
import Jail from "./Spaces/Jail"
import FreeParking from "./Spaces/FreeParking"
import GoToJail from "./Spaces/GoToJail"

export default function Board() {
  return (
    <div
      // style={{ transform: "translateY(-12%) rotateX(35deg)" }}
      className="board bg-primary-default h-[100vw] w-[100vw] sm:h-[85vw] sm:w-[85vw] md:h-[80vw] md:w-[80vw] lg:h-[100vh] lg:w-[100vh] relative"
    >
      <LineOne />
      <Jail />
      <LineTwo />
      <FreeParking />
      <LineThree />
      <GoToJail />
      <LineFour />
      <Go />
    </div>
  )
}
