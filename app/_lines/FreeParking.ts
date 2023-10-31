import Space from "../_classes/Space"
import { v4 as uuidv4 } from "uuid"

const FreeParking = new Space(uuidv4(), "FREE-PARKING").setPosition(
  20
)

export default FreeParking
