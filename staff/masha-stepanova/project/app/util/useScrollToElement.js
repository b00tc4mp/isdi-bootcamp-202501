import { useEffect, useRef } from 'react'

export function useScrollToElement(currentElement, options = { behavior: 'smooth', block: 'start' }) {
  const elementRef = useRef(null)

  useEffect(() => {
    if (elementRef.current && currentElement) {
      elementRef.current.scrollIntoView(options)
    }
  }, [currentElement])

  return elementRef
}
