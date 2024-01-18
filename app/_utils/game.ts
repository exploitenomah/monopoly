import HousingProperty from "../_classes/HousingProperty";
import Player from "../_classes/Player";
import Space from "../_classes/Space";
import StationProperty from "../_classes/StationProperty";
import UtilityProperty from "../_classes/UtilityProperty";
import LineFour from "../_lines/LineFour";
import LineOne from "../_lines/LineOne";
import LineThree from "../_lines/LineThree";
import LineTwo from "../_lines/LineTwo";

export function findNearestStationPositionToPlayerCurrentPosition(player: Player){
  let nearestStation
  if (player.currentPosition < 5) nearestStation = 5
  else if (player.currentPosition < 15) nearestStation = 15
  else if (player.currentPosition < 25) nearestStation = 25
  else if (player.currentPosition >= 35) nearestStation = 45
  else nearestStation = 35
  return nearestStation
}

export function findNearestUtilityPosition(player: Player){
  let nearestUtility
  if (player.currentPosition < 12 || player.currentPosition >= 28)
    nearestUtility = 12
  else nearestUtility = 28
  return nearestUtility
}

export function getPropertyByPosition(position: number){
  const findProperty = (value: HousingProperty | Space | StationProperty | UtilityProperty, index: number, obj: (HousingProperty | Space | StationProperty | UtilityProperty)[]) => value.position === position
  if(position < 10) return LineOne.find(findProperty)
  if(position < 20) return LineTwo.find(findProperty)
  if(position < 30) return LineThree.find(findProperty)
  else return LineFour.find(findProperty)
}