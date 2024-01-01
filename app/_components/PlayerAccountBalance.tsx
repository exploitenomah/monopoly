import Player from "../_classes/Player";

export default function PlayerAccountBalance({ player }: { player: Player }) {
  return (
    <li className="text-center">
      <div
        className="w-[2rem] h-[2rem] mb-[2px] rounded-full mx-auto border-solid border-primary-dark border-2"
        style={{ backgroundColor: player.color || "" }}
      />
      <h3 className="text-primary-dark text-2xl font-bold capitalize">
        {player.name}
      </h3>
      <p
        style={{
          color:
            player.accountBalance < 300
              ? "red"
              : player.accountBalance > 1000
                ? "green"
                : "black",
        }}
        className="text-xl"
      >
        ₦ {player.accountBalance}.00
      </p>
      {player.isBankrupt && (
        <p className="text-xl font-bold uppercase text-red-500">Bankrupt</p>
      )}
    </li>
  );
}
