import { login } from '#/api/mutations/auth'
import { AuthContext } from '#/context/AuthProvider'
import { router } from '#/router'
import { getError, hasError } from '#/utils/errors'
import { Button } from '#components/catalyst/button'
import { ErrorMessage, Field, Label } from '#components/catalyst/fieldset'
import { Input } from '#components/catalyst/input'
import { ApiError } from '#types/error'
import { AuthContextType, LoginPayload, User } from '#types/user'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { enqueueSnackbar } from 'notistack'
import { useContext } from 'react'

export const Route = createFileRoute('/_default/login')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      console.log('coucou')
      console.log('context.user', context.user)
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: () => <Login />,
})

const Login = () => {
  const { updateUser } = useContext(AuthContext) as AuthContextType

  const { mutate, isPending, error } = useMutation<
    User,
    ApiError[],
    LoginPayload
  >({
    mutationFn: (payload: LoginPayload) => {
      return login(payload)
    },
    onSuccess: (data) => {
      updateUser(data)
      enqueueSnackbar('Vous êtes connecté', { variant: 'success' })
      router.history.push('/dashboard', { replace: true })
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      mutate(value)
    },
  })

  return (
    <div className="flex w-full h-[80vh] items-center justify-center flex-col gap-10">
      <h1 className="text-3xl font-bold">Se connecter</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
        className="w-96 flex flex-col gap-3">
        <form.Field
          name="email"
          children={(field) => (
            <Field>
              <Label>Email</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="email"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="zen@vitality.com"
                autoComplete="email"
                invalid={hasError(error, 'email')}
              />
              {hasError(error, 'email') && (
                <ErrorMessage>{getError(error, 'email')?.message}</ErrorMessage>
              )}
            </Field>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <Field>
              <Label>Password</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="password"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="••••••"
                autoComplete="current-password"
                showEyeIcon
                invalid={hasError(error, 'password')}
              />
              {hasError(error, 'password') && (
                <ErrorMessage>
                  {getError(error, 'password')?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />
        {error && (
          <span className="text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500">
            {getError(error)?.message}
          </span>
        )}
        <Button type="submit" disabled={isPending}>
          Se connecter
        </Button>
      </form>

      <div className="flex gap-2 items-center">
        <p>Pas encore de compte ?</p>
        <Button color="dark/white" to={'/register'}>
          S'enregistrer
        </Button>
      </div>
    </div>
  )
}
