import axios from 'axios'
import type { Overlay } from '../types/overlay'
import { makeUrl } from './utils'

export const getOverlays = (): Promise<Overlay[]> =>
  axios.get(makeUrl('overlays')).then((res) => res.data)
