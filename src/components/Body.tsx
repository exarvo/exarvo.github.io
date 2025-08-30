import clsx from "clsx";

export function Body({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={clsx(className, "prose dark:prose-invert")} {...props} />
  );
}
