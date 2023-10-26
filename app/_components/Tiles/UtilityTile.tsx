import UtilityProperty from "@/app/_classes/UtilityProperty"
import Image from "next/image"

export default function UtilityTile({
  classType,
}: {
  classType: UtilityProperty
}) {
  return (
    <div className="w-full h-full border-solid border-primary-dark border">
      <div className="h-[18%] border-b border-solid border-primary-dark">
        {classType.name}
      </div>
      <div className="flex flex-col justify-center items-center">
        <Image
          src={
            classType.category === "WATER"
              ? "/image-files/water.svg"
              : "/image-files/electricity.svg"
          }
          width={60}
          height={60}
          alt="super tax"
        />
        {classType.price}
      </div>
    </div>
  )
}
