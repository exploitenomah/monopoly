import { CSSProperties, ReactNode } from "react"

export default function CardContainer({
  style,
  children,
}: {
  style?: CSSProperties
  children: ReactNode | ReactNode[]
}) {
  return (
    <div
      style={style}
      className="z-10 absolute w-[35%] h-[20%] border-dashed border-2 border-primary-dark"
    >
      {children}
    </div>
  )
}
