const defaultOptions = {
  columns: '*',
  page: null,
  limit: 30,
  where: {},
  order: 'id DESC'
}

// Creates the "SELECT" sql statement for find one record
export function find(tableName) {
  return `SELECT * FROM ${tableName} WHERE id = ? LIMIT 1;`
}

export function anyById(tableName) {
  return `SELECT count(Id) AS COUNT FROM ${tableName} `
}


/* Creates the "SELECT" sql statement for query records
 * Ex: qb.query({
 *   columns: 'id, nome, status',
 *   where: {status_eq: 'encerrado'}
 * })
 */
export function query(tableName, options = {}) {
  let { columns, page, limit, where, order, inn } = {
    ...defaultOptions,
    ...options
  }
  let whereStatement = queryWhere(where)

  if(inn != undefined) {
    try {
      let paras = []
        for(let i = 0; i < options.inn.key.length; i += 1)
          paras.push('?')

      whereStatement = whereStatement.replace('?' , paras.join() )
    } catch {}
  }

  let sqlParts = [
    'SELECT',
    columns,
    'FROM',
    tableName,
    whereStatement,
    'ORDER BY',
    order
  ]

  if(page !== null) {
    sqlParts.push(...[
      'LIMIT',
      limit,
      'OFFSET',
      limit * (page - 1)
    ])
  }

  return sqlParts.filter(p => p !== '').join(' ')
}

// Convert operators to database syntax
export function propertyOperation(statement) {
  const operations = {
    eq: '=',
    neq: '<>',
    lt: '<',
    lteq: '<=',
    gt: '>',
    gteq: '>=',
    cont: 'LIKE',
    in: 'IN({PARAMETRES})'
  }
  const pieces = statement.split('_')
  const operation = pieces.pop()
  const property = pieces.join('_')
  if (!operations.hasOwnProperty(operation)) {
    throw new Error(
      'Operation not found, use (eq, neq, lt, lteq, gt, gteq, cont, _in)'
    )
  }
  return `${property} ${operations[operation]}`
}

// Build where query
export function queryWhere(options) {
  const list = Object.keys(options).map(p => {
    let prop = propertyOperation(p)

   return  prop.includes('({PARAMETRES})') ? prop.replace('{PARAMETRES}' , '?') : `${prop} ?`
  })
  return list.length > 0 ? `WHERE ${list.join(' AND ')}` : ''
}

export default { find, anyById, query }
