export const CompanyModel = (connection, type) => {
  return connection.define('company', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING(100),
      allowNull: false
    },
    since: {
      type: type.STRING(4),
      allowNull: true
    }
  })
}
