import { Configuration } from '#types/configuration.js'
import { makeUrl } from '#utils/url.js'
import axios from 'axios'

export const getConfigurations = (token: string): Promise<Configuration[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  return axios
    .get(makeUrl('configurations'), config)
    .then((res) => res.data)
    .catch((error) => {
      throw error?.response?.data.errors
    })
}
export const getConfiguration = (
  token: string,
  uuid: string
): Promise<Configuration> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  return axios
    .get(makeUrl(`configurations/${uuid}`), config)
    .then((res) => res.data)
    .catch((error) => {
      throw error?.response?.data.errors
    })
}
