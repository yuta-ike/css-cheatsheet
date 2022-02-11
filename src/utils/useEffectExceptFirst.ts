import { useEffect, useState } from "react"

const useEffectExceptFirst: typeof useEffect = (effect, deps) => {
  const [isCalled, setIsCalled] = useState(false)
  useEffect(() => {
    if (isCalled) {
      effect()
    } else {
      setIsCalled(true)
    }
  }, deps)
}

export default useEffectExceptFirst
