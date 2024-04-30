import { Link, LinkProps, ReactNode } from '@tanstack/react-router'

interface AsideLinkProps {
  children: ReactNode
}

export const AsideLink = ({
  children,
  ...props
}: AsideLinkProps & LinkProps) => {
  return (
    <Link
      {...props}
      className="p-2 hover:bg-slate-200 hover:dark:bg-slate-700 rounded transition-colors flex"
      activeProps={{ className: 'bg-slate-200 dark:bg-slate-700' }}>
      {children}
    </Link>
  )
}
