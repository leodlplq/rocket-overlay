import { createConfiguration } from '#/api/mutations/configuration'
import { getOverlays } from '#/api/queries/overlay'
import { AuthContext } from '#/context/AuthProvider'
import { Button } from '#components/catalyst/button.js'
import Select, { SelectElement } from '#components/formElements/Select.js'
import Modal from '#components/modal/Modal.js'
import type {
  Configuration,
  NewConfigurationPayload,
} from '#types/configuration.js'
import type { ApiError } from '#types/error.js'
import { Overlay } from '#types/overlay.js'
import { AuthContextType } from '#types/user.js'
import { formatDataForSelect } from '#utils/format.js'

import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ICreateOverlayModal {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateOverlayModal = ({ open, setOpen }: ICreateOverlayModal) => {
  const { user } = useContext(AuthContext) as AuthContextType
  const { mutate, isPending } = useMutation<
    Configuration | null,
    ApiError[],
    NewConfigurationPayload
  >({
    mutationFn: (payload: NewConfigurationPayload) => {
      if (user) {
        return createConfiguration(payload, user?.token)
      }
      return new Promise((resolve) => resolve(null))
    },
    onSuccess: (value) => {
      if (value) {
        setOpen(false)
      }
    },
  })
  const { data } = useQuery({ queryKey: ['overlays'], queryFn: getOverlays })
  const [selectedElement, setSelectedElement] = useState<SelectElement | null>(
    null
  )

  useEffect(() => {
    if (data && selectedElement === null) {
      setSelectedElement(formatDataForSelect<Overlay>(data, 'name')[0])
    }
  }, [data, selectedElement])

  const selectedOverlay = data?.find(
    (overlay) => overlay.id === selectedElement?.id
  )

  const displayOverlay = () => {
    if (selectedOverlay) {
      if (selectedOverlay?.videoUrl) {
        return (
          <video
            className="w-full h-full"
            src={`http://localhost:3333${selectedOverlay?.videoUrl}`}
            autoPlay
            muted
            loop
          />
        )
      }
      return <img src={`http://localhost:3333${selectedOverlay.imageUrl}`} />
    }
    return 'Loading'
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (selectedElement && user) {
      mutate({ overlay_id: selectedElement?.id })
    }
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="aspect-video max-h-[calc(80vh)] relative">
        {data ? (
          <>
            <form
              onSubmit={handleSubmit}
              className="absolute left-4 top-4 bg-slate-50 dark:bg-slate-800 rounded p-4 flex flex-col w-1/3 gap-2 justify-between z-50">
              <Select
                label="Choisissez un overlay"
                data={formatDataForSelect<Overlay>(data, 'name')}
                selected={selectedElement}
                setSelected={setSelectedElement}
              />
              <Button color="lime" type="submit" disabled={isPending}>
                Choisir
              </Button>
            </form>
            {displayOverlay()}
          </>
        ) : (
          'loading'
        )}
      </div>
    </Modal>
  )
}
