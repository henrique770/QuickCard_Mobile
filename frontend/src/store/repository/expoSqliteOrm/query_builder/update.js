// Creates the "Update" sql statement
export function update(tableName, object) {
  const { Id, ...props } = object
  const values = Object.keys(props)
    .map(k => `${k} = ?`)
    .join(', ')

  return `UPDATE ${tableName} SET ${values} WHERE Id = ?;`
}

export default { update }
