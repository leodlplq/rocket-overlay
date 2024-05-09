import { updateConfiguration } from '#/api/mutations/configuration'
import { AuthContext } from '#/context/AuthProvider'
import { Separator } from '#components/Separator.js'
import { Button } from '#components/catalyst/button.js'
import {
  ErrorMessage,
  Field,
  Fieldset,
  Label,
} from '#components/catalyst/fieldset.js'
import { Input } from '#components/catalyst/input.js'
import { Radio, RadioField, RadioGroup } from '#components/catalyst/radio.js'
import { Switch, SwitchField } from '#components/catalyst/switch.js'
import { FileInput } from '#components/formElements/FileInput.js'
import { Configuration, UpdateConfigurationPayload } from '#types/configuration'
import { ApiError } from '#types/error.js'
import { AuthContextType } from '#types/user.js'
import { getError, hasError } from '#utils/errors.js'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { useContext } from 'react'

interface IUpdateConfigurationProps {
  data: Configuration
}

export const UpdateConfigurationForm = ({
  data,
}: IUpdateConfigurationProps) => {
  const { user } = useContext(AuthContext) as AuthContextType
  const { mutate, isPending, error } = useMutation<
    Configuration,
    ApiError[],
    UpdateConfigurationPayload
  >({
    mutationFn: (payload: UpdateConfigurationPayload) => {
      return updateConfiguration(payload, data.uuid, user?.token || '')
    },
    onSuccess: () => {
      enqueueSnackbar('Overlay modifié !', { variant: 'success' })
    },
  })

  const form = useForm({
    defaultValues: {
      game_title: data?.gameTitle || '',
      number_of_games: data?.numberOfGames || 1,
      use_ingame_names: data?.useIngameNames !== 0,
      team_one_name: data?.teamOneName || '',
      team_one_score: parseInt(data?.teamOneScore || '0'),
      team_one_goals: parseInt(data?.teamOneGoals || '0'),
      team_one_image: null,
      team_two_name: data?.teamTwoName || '',
      team_two_score: parseInt(data?.teamTwoGoals || '0'),
      team_two_goals: parseInt(data?.teamTwoGoals || '0'),
      team_two_image: null,
    },
    onSubmit: async ({ value }) => {
      mutate(value)
    },
  })

  return (
    <>
      <form
        id="UpdateConfigurationForm"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
        className="grid gap-2 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 py-10"
        encType="multipart/form-data">
        <h2 className="col-span-full font-bold">Informations sur le match</h2>
        <form.Field
          name="game_title"
          children={(field) => (
            <Field>
              <Label>Nom de la partie</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="RLCS World Finals"
                invalid={hasError(error, field.name)}
              />
              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />
        <form.Field
          name="number_of_games"
          children={(field) => (
            <Field className={'flex flex-col justify-between'}>
              <Label>Nombre de matchs</Label>
              <Fieldset>
                <RadioGroup
                  name={field.name}
                  defaultValue={field.state.value.toString()}
                  onChange={(value) => field.handleChange(parseInt(value))}
                  className={'flex gap-3 h-9 px-3'}>
                  <RadioField>
                    <Radio value="1" />
                    <Label>BO1</Label>
                  </RadioField>
                  <RadioField>
                    <Radio value="3" />
                    <Label>BO3</Label>
                  </RadioField>
                  <RadioField>
                    <Radio value="7" />
                    <Label>BO7</Label>
                  </RadioField>
                  <RadioField>
                    <Radio value="9" />
                    <Label>BO9</Label>
                  </RadioField>
                </RadioGroup>
              </Fieldset>
              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />
        <form.Field
          name="use_ingame_names"
          children={(field) => (
            <SwitchField className={'flex-col justify-between gap-2'}>
              <Label className={'col-span-full'}>
                Utilisé les noms in-game
              </Label>
              <Switch
                color="pink"
                name={field.name}
                defaultChecked={field.state.value}
                className={'mb-2'}
                onChange={(checked) => field.handleChange(checked)}
              />
              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </SwitchField>
          )}
        />
        <Separator className="col-span-full" />
        <h2 className="col-span-full font-bold">Équipe 1</h2>
        <form.Field
          name="team_one_name"
          children={(field) => (
            <Field>
              <Label>Nom de l'équipe 1</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Team Vitality"
                invalid={hasError(error, field.name)}
              />
              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />
        <form.Field
          name="team_one_score"
          children={(field) => (
            <Field>
              <Label>Score dans le BO</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(parseInt(e.target.value))}
                placeholder="0"
                invalid={hasError(error, field.name)}
              />
              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />
        <form.Field
          name="team_one_goals"
          children={(field) => (
            <Field>
              <Label>Score dans le match en cours</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(parseInt(e.target.value))}
                placeholder="0"
                invalid={hasError(error, field.name)}
              />
              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />
        <form.Field
          name="team_one_image"
          children={(field) => (
            <Field>
              <Label>Logo de l'équipe 1</Label>
              <div className="flex items-center mt-3 gap-3">
                {data.teamOneImage ? (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_HOST}${data.teamOneImage}`}
                    className="h-8"
                  />
                ) : (
                  ''
                )}
                <FileInput
                  name={field.name}
                  onBlur={field.handleBlur}
                  type="file"
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      field.handleChange(event.target.files[0])
                    }
                  }}
                  invalid={hasError(error, field.name)}
                />
              </div>

              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />

        <Separator className="col-span-full" />
        <h2 className="col-span-full font-bold">Équipe 2</h2>
        <form.Field
          name="team_two_name"
          children={(field) => (
            <Field>
              <Label>Nom de l'équipe 2</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Karmine Corp"
                invalid={hasError(error, field.name)}
              />
              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />
        <form.Field
          name="team_two_score"
          children={(field) => (
            <Field>
              <Label>Score dans le BO</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(parseInt(e.target.value))}
                placeholder="0"
                invalid={hasError(error, field.name)}
              />
              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />
        <form.Field
          name="team_two_goals"
          children={(field) => (
            <Field>
              <Label>Score dans le BO</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(parseInt(e.target.value))}
                placeholder="0"
                invalid={hasError(error, field.name)}
              />
              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />
        <form.Field
          name="team_two_image"
          children={(field) => (
            <Field>
              <Label>Score dans le BO</Label>
              <div className="flex items-center mt-3 gap-3">
                {data.teamTwoImage ? (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_HOST}${data.teamTwoImage}`}
                    className="h-8"
                  />
                ) : (
                  ''
                )}
                <FileInput
                  name={field.name}
                  onBlur={field.handleBlur}
                  type="file"
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      field.handleChange(event.target.files[0])
                    }
                  }}
                  invalid={hasError(error, field.name)}
                />
              </div>
              {hasError(error, field.name) && (
                <ErrorMessage>
                  {getError(error, field.name)?.message}
                </ErrorMessage>
              )}
            </Field>
          )}
        />
      </form>
      <Button
        type="submit"
        color="zinc"
        form="UpdateConfigurationForm"
        disabled={isPending}>
        Modifier
      </Button>
    </>
  )
}
