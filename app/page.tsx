import Board from "./_components/Board"

export default function Home() {
  return (
    <main
      style={{ perspective: "1000px" }}
      className="w-screen h-screen flex justify-center items-center"
    >
      <Board />
    </main>
  )
}
