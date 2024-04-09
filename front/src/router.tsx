import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined!,
    user: undefined!,
    updateUser: () => {},
    logout: () => {},
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})
