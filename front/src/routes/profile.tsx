import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => <div>Hello /profile!</div>,
})
