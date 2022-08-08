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
//  * node_modules/googleapis/build/src/apis/sheets/v4.js

import { makeApi } from './api.mjs'

export const sheets = ({ version = 'v4', auth }) => {
  if (version !== 'v4') throw new Error('Unexpected version!')
  const api = makeApi('https://sheets.googleapis.com/v4/spreadsheets', auth)
  const spreadsheets = {
    batchUpdate: api('POST', '/{spreadsheetId}:batchUpdate'),
    create: api('POST', ''),
    get: api('GET', '/{spreadsheetId}'),
    getByDataFilter: api('POST', '/{spreadsheetId}:getByDataFilter'),

    developerMetadata: {
      get: api('GET', '/{spreadsheetId}/developerMetadata/{metadataId}'),
      search: api('POST', '/{spreadsheetId}/developerMetadata:search'),
    },

    sheets: {
      search: api('POST', '/{spreadsheetId}/sheets/{sheetId}:copyTo'),
    },

    values: {
      append: api('POST', '/{spreadsheetId}/values/{range}:append'),
      batchClear: api('POST', '/{spreadsheetId}/values:batchClear'),
      batchClearByDataFilter: api('POST', '/{spreadsheetId}/values:batchClearByDataFilter'),
      batchGet: api('GET', '/{spreadsheetId}/values:batchGet'),
      batchGetByDataFilter: api('POST', '/{spreadsheetId}/values:batchGetByDataFilter'),
      batchUpdate: api('POST', '/{spreadsheetId}/values:batchUpdate'),
      batchUpdateByDataFilter: api('POST', '/{spreadsheetId}/values:batchUpdateByDataFilter'),
      clear: api('POST', '/{spreadsheetId}/values/{range}:clear'),
      get: api('GET', '/{spreadsheetId}/values/{range}'),
      update: api('PUT', '/{spreadsheetId}/values/{range}'),
    },
  }
  return { spreadsheets }
}
