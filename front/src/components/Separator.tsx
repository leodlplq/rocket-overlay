import clsx from 'clsx'

export const Separator = ({ className, ...props }: any) => {
  return <hr className={clsx(className, 'my-4')} {...props} />
}
