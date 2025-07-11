import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay: number = 500): string => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounceValue(value), delay)

    return () => clearTimeout(timeoutId)
  }, [delay, value])

  return debounceValue
}
