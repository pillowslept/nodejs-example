export const only = (attributes, object) => {
  const data = {}
  attributes.forEach((attribute) => {
    if (Object.prototype.hasOwnProperty.call(object, attribute)) {
      Object.assign(data, { [attribute]: object[attribute] })
    }
  })

  return data
}
