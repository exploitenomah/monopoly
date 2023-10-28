import { CSSProperties, ReactNode } from "react"

export default function Card({
  style,
  children,
}: {
  style?: CSSProperties
  children: ReactNode | ReactNode[]
}) {
  return (
    <div
      style={style}
      className="flex items-center justify-center w-[95%] h-[95%] m-auto"
    >
      {children}
    </div>
  )
}
