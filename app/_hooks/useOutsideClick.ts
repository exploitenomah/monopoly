import { useCallback, useEffect, useRef, MutableRefObject } from "react"
import {} from "react"

export default function useOutsideClick(
  ref: MutableRefObject<Node | null>,
  handler: (e: MouseEvent | TouchEvent) => void
) {
  const handleOnOutsideClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      typeof handler === "function" && handler(event)
    },
    [handler]
  )

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handleOnOutsideClick(event)
    }
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)
    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handleOnOutsideClick])
}
