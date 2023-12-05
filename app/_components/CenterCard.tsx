import { ReactNode } from "react"

export default function CenterCard({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <>
      <div style={{ perspectiveOrigin: "bottom", perspective: "100px" }}>
        <div
          style={{ transform: "rotateX(-5deg) translateZ(20px)" }}
          className="rounded-lg bg-primary-default text-primary-dark border-primary-dark border-[3px] px-3 py-12 text-center"
        >
          {children}
        </div>
      </div>
    </>
  )
}
