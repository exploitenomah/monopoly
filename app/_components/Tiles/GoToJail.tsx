import Image from "next/image"

export default function GoToJail() {
  return (
    <div className="bg-orange-900 w-full h-full">
      <Image
        src={"/image-files/go-to-jail.png"}
        width={60}
        height={60}
        alt="go to jail"
        className="w-full h-full bg-red-600 rotate-[180deg]"
      />
    </div>
  )
}
