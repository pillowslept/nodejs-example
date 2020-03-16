export const only = (attributes, object) => {
  const data = {}
  attributes.forEach((attribute) => {
    if (object.hasOwnProperty(attribute)) {
      Object.assign(data, { [attribute]: object[attribute] })
    }
  })

  return data
}
