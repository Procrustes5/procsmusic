const config = {
  schema: './schema.graphql',
  documents: ['./src/**/*.{ts,tsx}'],
  generates: {
    './src/API.ts': {
      plugins: ['typescript', 'typescript-operations']
    }
  }
}

export default config