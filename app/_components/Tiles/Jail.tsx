import Image from "next/image"
import Space from '@/app/_classes/Space'

export default function Jail({ classType }: {
  classType: Space
}) {
  return (
    <div className="relative flex items-start justify-end w-full h-full text-primary-dark text-center font-bold">
      <Image
        src={"/image-files/jail.jpeg"}
        width={60}
        height={60}
        alt="super tax"
        className="w-[80%] h-[80%] mt-[-3px]"
      />
      <div className="absolute rotate-[90deg] left-[-40%] bottom-[40%] w-full text-[0.4rem] md:text-[0.6rem] lg:text-[0.8rem]">
        Just
      </div>
      <div className="absolute bottom-0 w-full text-[0.4rem] md:text-[0.6rem] lg:text-[0.8rem]">
        Visiting
      </div>
    </div>
  )
}
