import Image from "next/image"
import Space from '@/app/_classes/Space'

export default function Go({ classType }: {
  classType: Space
}) {
  return (
    <div className="bg-blue-900 w-full h-full">
      <Image
        src={"/image-files/go.jpeg"}
        width={60}
        height={60}
        alt="go to jail"
        className="w-full h-full bg-red-600 rotate- [90deg]"
      />
    </div>
  )
}
