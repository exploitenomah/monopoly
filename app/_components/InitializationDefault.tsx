
const pointsToNote = [
  "The order in which player details are entered does not determine the order of the game.",
  "The player with the highest die throw starts the game and the game continues in an order determined by the system.",
]

export default 


function InitializationInfo({
  startInitialization,
}: {
  startInitialization: () => void
}) {
  return (
    <>
      <h1 className="text-3xl text-center mb-5">
        Let&apos;s get this game started!
      </h1>
      <p className="text-center text-xl font-bold mb-3">
        The game is about to be initialized.
        <br /> Here are a few points to note
      </p>
      <ul className="list-disc flex flex-col items-start text-[1rem] font-medium mx-auto max-w-[88%]">
        {pointsToNote.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <small className="flex items-center gap-x-2 justify-center">
        Best of luck!!!
        <span className="flex items-center gap-x-2">
          You&apos;ll need plenty <span className="text-xl">😜</span>
        </span>
      </small>
      <button
        type="button"
        name="start game initialization"
        onClick={startInitialization}
        className="block mt-3 rounded-lg font-bold text-[1rem] shadow-2xl hover:scale-[1.03] active:scale-[0.98] bg-primary-dark text-primary-default w-full max-w-[200px] mx-auto py-[0.83rem] px-[1rem] "
      >
        Start Initialization
      </button>
    </>
  )
}
