// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Refactored from:
//  * node_modules/googleapis-common/build/src/apirequest.js
//  * node_modules/googleapis/build/src/apis/sheets/v4.js

import qs from 'qs'

const version = '5.1.0'

export const makeApi =
  (baseUrl, auth) =>
  (method, path) =>
  async (rawParams = {}) => {
    const { resource, requestBody, headers, ...params } = rawParams
    delete params.auth

    const parsedPath = path.replace(/{([a-z0-9]+)}/gi, (_, name) => {
      if (!Object.hasOwn(params, name)) throw new Error(`Missing parameter: ${name}`)
      const value = params[name]
      delete params[name] // delete from query params
      return value
    })

    return auth.request({
      validateStatus: (status) => (status >= 200 && status < 300) || status === 304,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      retry: true,
      headers: {
        ...(headers || {}),
        'Accept-Encoding': 'gzip',
        'User-Agent': `google-api-nodejs-client/${version} (gzip)`,
        'x-goog-api-client': `gdcl/${version} gl-node/${process.versions.node}`,
      },
      method,
      url: `${baseUrl}${parsedPath}`,
      data: requestBody || resource || undefined,
      params,
    })
  }
