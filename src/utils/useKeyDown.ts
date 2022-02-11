import { useCallback, useMemo } from "react"

type KeyMap = {
  [CommaJoinedKeys: string]: (key: string) => void
}

const useKeyDown = (_keyMap: KeyMap) => {
  const keyMap = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(_keyMap)
          .map(([keys, value]) => keys.split(/\s*,\s*/).map((key) => [key, value]))
          .flat(1),
      ),
    [_keyMap],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        return
      }
      keyMap[e.key]?.(e.key)
    },
    [keyMap],
  )

  return onKeyDown
}

export default useKeyDown
