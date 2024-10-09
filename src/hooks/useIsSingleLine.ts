import { useState, useCallback } from 'react'

const useIsSingleLine = () => {
  const [isSingleLine, setIsSingleLine] = useState<boolean>(false)

  // Callback ref 정의
  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const clientHeight = node.clientHeight
      const scrollHeight = node.scrollHeight

      // scrollHeight와 clientHeight를 비교하여 한 줄인지 아닌지 판별
      setIsSingleLine(scrollHeight === clientHeight)
    }
  }, [])

  return [isSingleLine, ref] as const
}

export default useIsSingleLine
