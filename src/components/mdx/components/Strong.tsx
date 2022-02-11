export type MarkerProps = React.ComponentProps<"strong">
export const Marker = (props: MarkerProps) => {
  return (
    <strong
      {...props}
      className="font-semibold text-twhite-400 underline decoration-twhite-400 underline-offset-2"
    />
  )
}
