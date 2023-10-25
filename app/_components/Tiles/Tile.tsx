export default function Tile({ x }: { x?: string }) {
  return (
    <div className="border-solid border-primary-dark border h-full text-blue-800 grow max-w-[12%]">
      {x}
    </div>
  )
}
