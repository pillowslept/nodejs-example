export const createUpdateValidation = {
  sanitize: {
    type: 'object',
    properties: {
      name: {
        type: 'string', rules: ['trim', 'title']
      },
      picture: {
        type: 'string', rules: ['trim']
      },
      birthplace: {
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
      picture: {
        type: 'string', optional: true
      },
      birthplace: {
        type: 'string', optional: true
      }
    }
  }
}
