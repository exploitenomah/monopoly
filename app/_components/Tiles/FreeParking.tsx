import Image from "next/image"

export default function FreeParking() {
  return (
    <div className="w-full h-full">
      <Image
        src={"/image-files/free-parking.jpeg"}
        width={60}
        height={60}
        alt="free-parking"
        className="w-full h-full bg-red-300 object-cover rotate-[90deg]"
      />
    </div>
  )
}
