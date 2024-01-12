import Player from "../_classes/Player";

export default function PlayerAccountBalance({ player }: { player: Player }) {
  return (
    <li className="text-center">
      <div
        className="w-[1.5rem] h-[1.5rem] mb-[2px] rounded-full mx-auto border-solid border-primary-dark border-2"
        style={{ backgroundColor: player.color || "" }}
      />
      <h3 className="text-primary-dark text-[1.7vmin] leading-[1.5] font-bold capitalize">
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
        className="text-[2vmin] md:text-[1.5vmin] leading-[1.5]"
      >
        ₦ {player.accountBalance}.00
      </p>
      {player.isBankrupt && (
        <p className="text-[1.4vmin] leading-[1.5] font-bold uppercase text-red-500">Bankrupt</p>
      )}
    </li>
  );
}
