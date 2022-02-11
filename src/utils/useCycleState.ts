import { useState } from "react"

const useCycleState = <Item extends string | number>(values: Item[], initIndex: number) => {
  const [state, setState] = useState<number>(initIndex)
  const setFirst = () => setState(0)
  const setLast = () => setState(values.length - 1)
  const setNext = () =>
    setState((state) => {
      if (values.length <= state + 1) {
        return 0
      }
      return state + 1
    })
  const setPrev = () =>
    setState((state) => {
      if (state - 1 < 0) {
        return values.length - 1
      }
      return state - 1
    })

  return {
    state: values[state],
    setState,
    setNext,
    setPrev,
    setLast,
    setFirst,
  }
}

export default useCycleState
