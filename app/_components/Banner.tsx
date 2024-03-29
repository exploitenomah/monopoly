import { ReactNode } from "react"

export default function Banner({ children }: { children?: ReactNode | ReactNode[] }) {

  return (
    <div>
      <div className="z-20 text-2xl min-[1090px]:rotate-x-[-5deg] min-[1090px]:translate-z-[37px] min-[1090px]:transfom-origin-top flex justify-center items-center border-b-blue-700 border-x-blue-700 border-b-[3px] border-x-[3px] border-b-solid border-x-solid fixed top-0 h-auto w-[85dvw] lg:h-[100px] min-[1090px]:h-[150px] bg-primary-default left-1/2 -translate-x-1/2 text-primary-dark font-semibold">
        {children}
      </div>
    </div>
  )
}
