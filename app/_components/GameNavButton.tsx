export default function GameNavButton({ toggleShowSideBar }: {
  toggleShowSideBar: () => void
}) {
  return (
    <button onClick={toggleShowSideBar} className="fixed w-[5vmax] right-0 top-[2vmin] bg-primary-default rounded-tl-md rounded-bl-md px-3 py-3 flex flex-col gap-y-2">
      <span className="block w-full h-[3px] bg-primary-dark rounded-lg"></span>
      <span className="block w-full h-[3px] bg-primary-dark rounded-lg"></span>
      <span className="block w-full h-[3px] bg-primary-dark rounded-lg"></span>
    </button>
  )
}
