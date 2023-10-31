import Space from "../_classes/Space"
import { v4 as uuidv4 } from "uuid"

const Jail = new Space(uuidv4(), "JAIL").setPosition(10)

export default Jail
