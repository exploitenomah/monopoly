import HousingProperty from "@/app/_classes/HousingProperty"

export default function HousingTile({
  classType,
}: {
  classType: HousingProperty
}) {
  return (
    <div className="w-full h-full border-solid border-primary-dark border">
      <div
        className="h-[18%] border-b border-solid border-primary-dark"
        style={{ backgroundColor: classType.color }}
      ></div>
      <div className="flex flex-col h-full justify-start items-center">
        <span >{classType.name}</span>
        <span className="font-medium tracking-tight">₦ {classType.price}</span>
      </div>
    </div>
  )
}
