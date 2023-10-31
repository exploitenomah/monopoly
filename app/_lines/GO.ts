import Space from "../_classes/Space"
import { v4 as uuidv4 } from "uuid"

const GO = new Space(uuidv4(), "GO").setPosition(0)

export default GO
