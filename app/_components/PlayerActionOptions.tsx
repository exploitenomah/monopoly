import { useCallback, useEffect, useMemo, useState } from "react";
import BoardGame, {
  chanceTiles,
  communityChestTiles,
} from "../_classes/BoardGame";
import Player from "../_classes/Player";
import { declineToPurchase, playerAction } from "../_redux/game.slice";
import { useAppDispatch } from "../_redux/hooks";
import CenterCard from "./CenterCard";
import { createPortal } from "react-dom";
import { TitleDeeds } from "./TitleDeeds/TitleDeedsContainer";
import GameSideBar from "./GameSideBar";
import toast from "react-hot-toast";
import useGeneratePlayerActionText from "../_hooks/useGeneratePlayerActionText";

export default function PlayerActionOptions({
  currentPlayer,
  game,
  rollValue,
}: {
  currentPlayer?: Player;
  game: BoardGame;
  rollValue: number;
}) {
  const [isMortgaging, setIsMortgaging] = useState<number | null>(null);
  const appDispatch = useAppDispatch();
  const currentPlayerIsOnChanceOrChest = useMemo(() => {
    return (
      chanceTiles.includes(currentPlayer?.currentPosition as number) ||
      communityChestTiles.includes(currentPlayer?.currentPosition as number)
    );
  }, [currentPlayer?.currentPosition]);

  const currentPositionProperty = useMemo(
    () =>
      BoardGame.findProperty(game, currentPlayer?.currentPosition as number),
    [game, currentPlayer?.currentPosition],
  );
  const { infoText, toastText } = useGeneratePlayerActionText({
    currentPlayer, game, rollValue, currentPositionProperty,
  })
  const toastMessage = toastText as { decline: string, accept: string }
  const showActionOptions = useMemo(() => {
    return (
      currentPlayer &&
      ((currentPlayer.justLandedOn === currentPlayer.currentPosition &&
        currentPlayer.hasActed === false &&
        !currentPlayerIsOnChanceOrChest) ||
        (currentPlayer.hasJustAdvanced === true &&
          game.hasHandledAdvancement === false))
    );
  }, [
    currentPlayer?.justLandedOn,
    currentPlayer?.hasActed,
    currentPlayer?.currentPosition,
    currentPlayerIsOnChanceOrChest,
    currentPlayer?.hasJustAdvanced,
    game.hasHandledAdvancement,
  ]);

  const playerCanActOnProperty = useMemo(() => {
    return (
      currentPlayer &&
      currentPositionProperty &&
      ((!("owner" in currentPositionProperty) &&
        !("price" in currentPositionProperty)) ||
        currentPositionProperty?.owner === currentPlayer.id ||
        (currentPlayer.accountBalance >= currentPositionProperty?.price &&
          currentPositionProperty?.owner === null) ||
        (currentPlayer.id !== currentPositionProperty.owner &&
          currentPositionProperty.owner !== null))
    );
  }, [currentPlayer, currentPositionProperty]);

  const handleDeclineToPurchase = useCallback(() => {
    toastMessage.decline.length > 0 &&
      toast(toastMessage.decline)
    currentPlayer &&
      appDispatch(declineToPurchase(currentPlayer.id))

  }, [toastMessage.decline, currentPlayer, appDispatch])

  const handlePlayerAction = useCallback(() => {
    toastMessage.accept.length > 0 && toast(toastMessage.accept)
    currentPlayer && appDispatch(playerAction(currentPlayer.id))
  }, [currentPlayer, toastMessage.accept, appDispatch])

  if (!showActionOptions || !currentPositionProperty) return null;
  return (
    <>
      <MortgageView
        show={isMortgaging !== null}
        close={() => setIsMortgaging(null)}
        game={game}
        player={currentPlayer}
      />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <CenterCard>
          <div className="min-h-[20vh] min-w-[280px]">
            <div>{infoText as string}</div>
            {currentPlayer &&
              currentPlayer.accountBalance < currentPositionProperty?.price &&
              currentPositionProperty?.owner === null && (
                <b className="text-red-500  min-w-[40%] block my-1 ">
                  You cannot afford this property!!
                </b>
              )}
            <div className="flex flex-wrap mt-4 gap-4 items-center justify-center">
              {currentPositionProperty.owner === null && (
                <>
                  <button
                    onClick={() =>
                      currentPlayer && setIsMortgaging(currentPlayer.id)
                    }
                    className=" max-w-max min-w-[40%] shadow-lg p-4 rounded-lg border text-sm font-bold capitalize bg-primary-dark text-primary-default"
                  >
                    Mortgage properties
                  </button>
                  <button
                    onClick={handleDeclineToPurchase}
                    className=" max-w-max min-w-[40%] shadow-lg p-4 rounded-lg border text-sm font-bold capitalize"
                  >
                    decline to purchase
                  </button>
                </>
              )}
              {currentPositionProperty.owner === currentPlayer?.id && (
                <button className="capitalize  max-w-max min-w-[40%] shadow-lg p-4 rounded-lg border border-primary-dark text-primary-dark">
                  transact
                </button>
              )}

              {playerCanActOnProperty && (
                <button
                  className="capitalize max-w-max min-w-[40%] shadow-lg p-4 rounded-lg border text-primary-default bg-primary-dark"
                  onClick={handlePlayerAction}
                >
                  {currentPositionProperty?.owner === currentPlayer?.id
                    ? "done"
                    : "ok"}
                </button>
              )}
            </div>
          </div>
        </CenterCard>
      </div>
    </>
  );
}

function MortgageView({
  player,
  game,
  close,
  show,
}: {
  player?: Player;
  game: BoardGame;
  close: () => void;
  show: boolean;
}) {
  const [document, setDocument] = useState<Document | null>(null);

  const playerProperties = useMemo(() => {
    return player
      ? BoardGame.findPropertiesBelongingToOwner(player.id, game)
      : [];
  }, []);

  useEffect(() => {
    if (document === null) setDocument(window.document);
  }, []);

  if (!player) return null;
  return (
    document &&
    createPortal(
      <GameSideBar show={show} close={close}>
        <h1 className="text-primary-dark text-2xl text-center">
          <span className="font-bold capitalize">{player.name}</span>, Select
          the properties you would like to mortgage.
        </h1>
        <ul className="list-none w-full flex gap-3 px-5 py-4 flex-wrap justify-center items-center">
          {playerProperties.map((property, idx) => {
            const Component =
              TitleDeeds[property.type as keyof typeof TitleDeeds];
            const [isSelected, setIsSelected] = useMyState(false);
            return (
              <label
                key={property.id}
                className="w-full max-w-[180px] shrink-0 cursor-pointer flex items-start gap-3"
              >
                <input
                  checked={isSelected}
                  onChange={() => setIsSelected((p: boolean) => !p)}
                  type="checkbox"
                  className="appearance-none"
                />
                <span className="block rounded-md w-[20px] h-[20px] border-2 border-primary-dark"></span>
                <Component property={property as any} />
              </label>
            );
          })}
        </ul>
      </GameSideBar>,
      document?.body,
      player?.id.toString(),
    )
  );
}

const useMyState = (initialValue: any | (() => any)) => {
  let value = initialValue;
  const setValue = (newValue: any | ((oldValue: any) => any)) => {
    if (typeof newValue === "function") value = newValue(value);
    else value = newValue;
  };
  return [value, setValue];
};
