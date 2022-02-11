export type TableProps = React.ComponentProps<"table">
export const Table = (props: TableProps) => {
  return <table {...props} className="!mb-8 !mt-4 w-full first:!mt-0" />
}

export type TableHeaderProps = React.ComponentProps<"th">
export const TableHeader = (props: TableHeaderProps) => {
  return <th {...props} className="py-1 pl-3 text-sm font-normal text-twhite-50" />
}

export type TableDataProps = React.ComponentProps<"td">
export const TableData = (props: TableDataProps) => {
  return <td {...props} className="py-2 pl-3 text-sm text-twhite-100" />
}

export type TableRowProps = React.ComponentProps<"tr">
export const TableRow = (props: TableRowProps) => {
  return <tr {...props} className="border-twhite-50/10 last:border-b even:bg-twhite-400/5" />
}
