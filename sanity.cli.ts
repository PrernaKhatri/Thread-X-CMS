import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '78azubcd',
    dataset: 'production',
  },
  deployment: {
    appId: 'hsk9jyp1k27ww2zsz6dxcn47',
  },
  typegen: {
    enabled: true,
    path: '../Thread-X/{app,components,lib,hooks}/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../Thread-X/sanity.types.ts',
    overloadClientMethods: true,
  },
})
