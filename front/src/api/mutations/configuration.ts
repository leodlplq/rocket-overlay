import {
  Configuration,
  NewConfigurationPayload,
  UpdateConfigurationPayload,
} from '#types/configuration.js'
import { makeUrl } from '#utils/url.js'
import axios from 'axios'

export const createConfiguration = (
  payload: NewConfigurationPayload,
  token: string
): Promise<Configuration> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  return axios
    .post(makeUrl('configurations'), payload, config)
    .then((res) => res.data)
    .catch((error) => {
      throw error?.response?.data.errors
    })
}

export const updateConfiguration = (
  payload: Partial<UpdateConfigurationPayload>,
  uuid: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      Accept: '*/*',
    },
  }

  return axios
    .post(makeUrl(`configurations/${uuid}`), payload, config)
    .then((res) => {
      console.log('update', res.data)
      return res.data
    })
    .catch((error) => {
      throw error?.response?.data.errors
    })
}
