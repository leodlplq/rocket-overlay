import { AuthContextType } from '#/types/user'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { SnackbarProvider } from 'notistack'

export const Route = createRootRouteWithContext<
  AuthContextType & { queryClient: QueryClient }
>()({
  component: () => (
    <>
      <SnackbarProvider />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
