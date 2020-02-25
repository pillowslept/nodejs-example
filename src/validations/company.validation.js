export const createUpdateValidation = {
  sanitize: {
    type: 'object',
    properties: {
      name: {
        type: 'string', rules: ['trim', 'title']
      },
      since: {
        type: 'string', rules: ['trim']
      }
    }
  },
  validate: {
    type: 'object',
    properties: {
      name: {
        type: 'string', optional: false, minLength: 1
      },
      since: {
        type: 'string', optional: true
      }
    }
  }
}
