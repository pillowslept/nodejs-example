export const createValidation = {
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

export const addGenresValidation = {
  sanitize: {
    type: 'object',
    properties: {
      genres: {
        type: 'array',
        items: { type: 'integer' }
      }
    }
  },
  validate: {
    type: 'object',
    properties: {
      genres: {
        type: 'array', optional: false, minLength: 1, uniqueness: true
      }
    }
  }
}
