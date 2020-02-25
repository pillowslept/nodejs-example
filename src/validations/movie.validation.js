export const createValidation = {
  sanitize: {
    type: 'object',
    properties: {
      name: {
        type: 'string', rules: ['trim', 'title']
      },
      companyId: {
        type: 'integer'
      }
    }
  },
  validate: {
    type: 'object',
    properties: {
      name: {
        type: 'string', optional: false, minLength: 1
      },
      companyId: {
        type: 'integer', optional: false
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
