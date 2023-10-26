import Space from "@/app/_classes/Space"
import Image from "next/image"

export default function IncomeTaxTile({ classType }: { classType: Space }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center ">
      <span>Income Tax</span>
      <Image
        src="/image-files/income-tax.svg"
        width={40}
        height={40}
        alt="community chest"
      />
      pay ₦ 100
    </div>
  )
}
