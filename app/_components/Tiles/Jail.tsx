import Image from "next/image"

export default function Jail() {
  return (
    <div className="relative flex items-start justify-end w-full h-full text-primary-dark text-center font-bold">
      <Image
        src={"/image-files/jail.jpeg"}
        width={60}
        height={60}
        alt="super tax"
        className="w-[80%] h-[80%] mt-[-3px]"
      />
      <div className="absolute rotate-[90deg] left-[-40%] bottom-[40%] w-full">
        Just
      </div>
      <div className="absolute bottom-0 w-full">Visiting</div>
    </div>
  )
}
