import classNames from "classnames"

export type MenuItemProps = {
  selected: boolean
  id: string
  value: string
}

const MenuItem = ({ selected, id, value }: MenuItemProps) => (
  <a
    className={classNames(
      "block rounded py-1 px-2.5 hover:text-twhite-400 focus:outline-none focus-visible:text-twhite-400 focus-visible:ring-2 focus-visible:ring-sky-400/50",
      selected && "rounded-md bg-sky-400/20 text-twhite-200",
    )}
    href={`#${id}`}
  >
    {value}
  </a>
)

export default MenuItem
