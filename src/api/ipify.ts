import axios, { AxiosResponse } from 'axios'

/**
 * ipv4
 */
export const ipv4Ipify = function () {
  return axios.get('https://api.ipify.org', {
    withCredentials: false // Cookie
  }).then((response: AxiosResponse) => {
    return response.data
  })
}

/**
 * ipv6
 */
export const ipv6Ipify = function () {
  return axios.get('https://api64.ipify.org', {
    withCredentials: false // Cookie
  }).then((response: AxiosResponse) => {
    return response.data
  })
}
