export const createUpdateValidation = {
  sanitize: {
    type: 'object',
    properties: {
      name: {
        type: 'string', rules: ['trim', 'title']
      }
    }
  },
  validate: {
    type: 'object',
    properties: {
      name: {
        type: 'string', optional: false, minLength: 1
      }
    }
  }
}
