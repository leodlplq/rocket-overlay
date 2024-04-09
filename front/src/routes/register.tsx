import { register } from '#/api/mutations/auth'
import { Button } from '#/components/catalyst/button'
import {
  ErrorMessage,
  Field,
  Fieldset,
  Label,
} from '#/components/catalyst/fieldset'
import { Input } from '#/components/catalyst/input'
import { AuthContext } from '#/context/AuthProvider'
import { ApiError } from '#/types/error'
import { AuthContextType, RegisterPayload, User } from '#/types/user'
import { getError, hasError } from '#/utils/errors'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { enqueueSnackbar } from 'notistack'
import { useContext } from 'react'

export const Route = createFileRoute('/register')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: () => <Register />,
})

const Register = () => {
  const { updateUser } = useContext(AuthContext) as AuthContextType

  const { mutate, isPending, error } = useMutation<
    User,
    ApiError[],
    RegisterPayload
  >({
    mutationFn: (payload: RegisterPayload) => {
      return register(payload)
    },
    onSuccess: (data) => {
      updateUser(data)
      enqueueSnackbar('Compte creé !', { variant: 'success' })
    },
  })

  const form = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      mutate(value)
    },
  })
  return (
    <div className="flex w-full h-[80vh] items-center justify-center flex-col gap-10">
      <h1 className="text-3xl font-bold">S'inscrire</h1>

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
                invalid={hasError(error, 'email')}
              />
              {hasError(error, 'email') && (
                <ErrorMessage>{getError(error, 'email')?.message}</ErrorMessage>
              )}
            </Field>
          )}
        />
        <Fieldset className={'grid grid-cols-2 gap-2'}>
          <form.Field
            name="firstname"
            children={(field) => (
              <Field>
                <Label>Prénom</Label>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="text"
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Alexis"
                  invalid={hasError(error, 'firstname')}
                />
                {hasError(error, 'firstname') && (
                  <ErrorMessage>
                    {getError(error, 'firstname')?.message}
                  </ErrorMessage>
                )}
              </Field>
            )}
          />
          <form.Field
            name="lastname"
            children={(field) => (
              <Field>
                <Label>Nom</Label>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="text"
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Bernier"
                  invalid={hasError(error, 'lastname')}
                />
                {hasError(error, 'lastname') && (
                  <ErrorMessage>
                    {getError(error, 'lastname')?.message}
                  </ErrorMessage>
                )}
              </Field>
            )}
          />
        </Fieldset>

        <form.Field
          name="username"
          children={(field) => (
            <Field>
              <Label>Pseudo</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Zen"
                invalid={hasError(error, 'username')}
              />
              {hasError(error, 'username') && (
                <ErrorMessage>
                  {getError(error, 'username')?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <Field>
              <Label>Mot de passe</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="password"
                onChange={(e) => field.handleChange(e.target.value)}
                showEyeIcon
                placeholder="••••••"
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
        <Button type="submit" disabled={isPending}>
          S'inscrire
        </Button>
      </form>

      <div className="flex gap-2 items-center">
        <p>Déjà un compte ?</p>
        <Button color="dark/white" to={'/login'}>
          Se connecter
        </Button>
      </div>
    </div>
  )
}
