export default function PropertyTile({ color }: { color: string }) {
  return (
    <div className="w-full h-full border-solid border-primary-dark border">
      <div
        className="h-[18%] border-b border-solid border-primary-dark"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  )
}
