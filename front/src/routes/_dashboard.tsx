import { Logo } from '#components/Logo.js'
import { AsideLink } from '#components/links/AsideLink.js'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { Cube } from 'iconoir-react'

export const Route = createFileRoute('/_dashboard')({
  component: () => <DashboardLayout />,
})

const DashboardLayout = () => {
  return (
    <div className="flex">
      <aside className="h-lvh p-4 w-[300px] flex flex-col gap-10">
        <Link to={'/'}>
          <Logo />
        </Link>

        <ul className="flex flex-col gap-2">
          <li>
            <AsideLink to={'/overlays'}>
              <div className="flex gap-2">
                <Cube />
                Mes overlays
              </div>
            </AsideLink>
          </li>
        </ul>
      </aside>
      <main className="p-2 flex flex-1">
        <div className="bg-zinc-50 dark:bg-slate-700 p-5 w-full h-full rounded text-slate-950 dark:text-slate-50">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
