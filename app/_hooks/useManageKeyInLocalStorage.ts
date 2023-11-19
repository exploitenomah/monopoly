import { useState, useEffect, useCallback } from "react"

export default function useManageKeyInLocalStorage(
  key: string,
  initialValue: any
) {
  const [value, setValue] = useState<any | null>(initialValue)

  useEffect(() => {
    if (value !== null) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  useEffect(() => {
    const valueInLs = localStorage.getItem(key)
    if (valueInLs) {
      setValue(JSON.parse(valueInLs))
    }
  }, [key])

  const updateValue = useCallback((update: typeof initialValue) => {
    setValue(update)
  }, [])

  const clearValue = useCallback(() => {
    localStorage.removeItem(key)
    setValue(null)
  }, [key])

  return [
    value,
    updateValue,
    clearValue,
  ]
}
