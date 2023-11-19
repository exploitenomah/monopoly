export default function Banner({ notification }: { notification?: string }) {
  if (!notification) return null
  return (
    <div>
      <div className="z-20 text-2xl min-[1090px]:rotate-x-[-5deg] min-[1090px]:translate-z-[37px] min-[1090px]:transfom-origin-top flex justify-center items-center border-b-blue-700 border-x-blue-700 border-b-[3px] border-x-[3px] border-b-solid border-x-solid fixed top-0 w-[50vw] h-[100px] min-[1090px]:w-[50vw] min-[1090px]:h-[150px] bg-primary-default left-1/2 -translate-x-1/2 text-primary-dark font-semibold">
        {notification}
      </div>
    </div>
  )
}
