import type { Overlay } from '#types/overlay'
import { makeUrl } from '#utils/url'
import axios from 'axios'

export const getOverlays = (): Promise<Overlay[]> =>
  axios.get(makeUrl('overlays')).then((res) => res.data)
