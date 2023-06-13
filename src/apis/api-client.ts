/* eslint-disable */
/* tslint-disable */
import axios from 'axios'
import { _ } from "../utils/lodash";
import * as Sentry from "@sentry/react";
import * as http from "http";
import * as https from "https";

let API_BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  API_BASE_URL = 'http://localhost:3001'
} else {
  API_BASE_URL = `${window.location.protocol}//${window.location.host}`
}

const httpAgent = new http.Agent({
  keepAliveMsecs: 500,
  keepAlive: true,
  maxSockets: 100,
  maxFreeSockets: 5,
});

const httpsAgent = new https.Agent({
  keepAliveMsecs: 500,
  keepAlive: true,
  maxSockets: 100,
  maxFreeSockets: 5,
});

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  httpAgent: `${window.location.protocol}` === 'http:' ? httpAgent : httpsAgent
});

const errorExclusions = [
  'v1/pitch/order/success',
  'v1/cmTasks',
  'v1/pitch/user/id'
]

const shouldLogError = (errorExclusions: string[], endPoint: string): boolean => {
  for (const errorExclusion of errorExclusions) {
    if(endPoint.includes(errorExclusion)){
      return false
    }
  }

  return true
}

async function client(endpoint: string, props: any = {}) {
  const {
    data = null,
    headers: customHeaders = {},
    ...customConfig
  } = props
  const config = {
    url: endpoint,
    method: data ? 'post' : 'get',
    data,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
    timeout: 100000,
  }

  return axiosInstance({
    ...config
  }).then((response) => {
    return _.get(response, 'data', {})
  }).catch(error => {
    if(shouldLogError(errorExclusions, endpoint)){
      Sentry.captureException(error);
    }
    return Promise.reject(error)
  })
}

export {client, API_BASE_URL}
