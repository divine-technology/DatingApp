const OpenAPI = require('openapi-typescript-codegen');
const fs = require('fs-extra');
const {resolve} = require('path');

(async () => {
  console.log('generating api client...');

  await OpenAPI.generate({
    input: 'http://localhost:3000/api-json',
    output: './src/apiClient',
    httpClient: 'axios',
    clientName: 'ApiClient',
    postfix: 'Api',
    request: './src/apiClient/scripts/client/templates/request.ts',
    useOptions: true,
    exportModels: true,
    exportCore: true,
    exportSchemas: true,
    generateResponses: true,
    useOptionsReturnType: true,
  });

  await fs.copyFileSync(
    './src/apiClient/scripts/client/templates/promise-templates.ts',
    resolve('./src/apiClient/core', 'CancelablePromise.ts'),
  );

  console.log('DONE generating api client.');
})();
