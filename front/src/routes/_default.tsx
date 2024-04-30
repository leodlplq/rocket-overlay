import Header from '#components/Header.js'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default')({
  component: () => (
    <div>
      <Header />
      <Outlet />
    </div>
  ),
})
