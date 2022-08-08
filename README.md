# `@rray/googleapis`

A drop-in slim replacement to googleapis subset.

## Refactor notice

This is based on a heavily refactored code from
[googleapis](https://www.npmjs.com/package/googleapis) and
[googleapis-common](https://www.npmjs.com/package/googleapis-common).

## Supported modules

Currently, only `sheets`.

## Usage

```js
import { GoogleAuth } from 'google-auth-library'
// import { google } from 'googleapis'
// import * as google from '@googleapis/sheets'
import * as google from '@rray/googleapis'

const auth = new GoogleAuth({
  keyFile: serviceCredentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const { spreadsheets } = google.sheets({ version: 'v4', auth }) // version is not required

console.log(spreadsheets) // { batchUpdate, create, get, developerMetadata, sheets, values }
```

## License

[Apache-2.0](./LICENSE)
