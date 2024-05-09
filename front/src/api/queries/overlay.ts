import type { Overlay } from '#types/overlay'
import { makeUrl } from '#utils/url'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

export const getOverlays = (): Promise<Overlay[]> =>
  axios
    .get(makeUrl('overlays'))
    .then((res) => res.data)
    .catch((error) => {
      enqueueSnackbar('Erreur server', {
        variant: 'error',
      })
      throw error?.response?.data.errors
    })
