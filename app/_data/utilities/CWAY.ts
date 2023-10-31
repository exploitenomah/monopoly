import UtilityProperty from "@/app/_classes/UtilityProperty"
import { v4 as uuidv4 } from "uuid"

const CWAYWater = new UtilityProperty(uuidv4(), "CWAY", 200, "WATER")
export default CWAYWater
