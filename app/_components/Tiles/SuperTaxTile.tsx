import Space from "@/app/_classes/Space"
import Image from "next/image"

export default function SuperTaxTile({ classType }: { classType: Space }) {
  return (
    <div className="w-full h-full flex flex-col items-center text-center">
      <span>Super Tax</span>
      <Image
        src="/image-files/super-tax.svg"
        width={60}
        height={30}
        alt="super tax"
        className="hidden md:inline-block"
      />
      pay ₦ 200
    </div>
  )
}
