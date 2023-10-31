import UtilityProperty from "@/app/_classes/UtilityProperty"
import { v4 as uuidv4 } from "uuid"

const PHCN = new UtilityProperty(
  uuidv4(),
  "PHCN",
  200,
  "ELECTRICITY"
)
export default PHCN
