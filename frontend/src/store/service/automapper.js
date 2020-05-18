import BaseEntity from "~/entities/BaseEntity"
import ExtendsModel from "~/store/models/ExtendsModel"

const mapper = (toMapper, toSource) => {

  //check mapper instance
  let mapper = new toMapper()

  // To entity -> model
  if(mapper instanceof ExtendsModel ) {

    return mapperModel(mapper, toMapper, toSource)
  }

  // To model -> entity
  if(mapper instanceof BaseEntity) {

    return mapperEntity(toMapper, toSource)
  }

  throw 'Unsupported mapper'
}

const mapperEntity = (toMapper, toSource) => {

  // new Entity()
  return new toMapper(toSource)
}

const mapperModel = (mapper, toMapper, toSource) => {

  let columns = mapper.constructor.columnMapping
    , columnsKeys = Object.keys(columns)
    , values = {}

  for(let i = 0; i < columnsKeys.length; i += 1) {
      let key = columnsKeys[i]

      values[key] = toSource[key]
  }
  // new Model()
  return new toMapper(values)
}
/**
 * Map object based on signature
 * @param {BaseEntity | ExtendsModel } toMapper   signature of the class to which the object will be mapped
 * @param {BaseEntity | ExtendsModel | BaseEntity[] | ExtendsModel [] } toSource  values for mapping feed
 * @return {BaseEntity | ExtendsModel | BaseEntity[] | ExtendsModel []}
 */
export default function (toMapper, toSource) {

    if(Array.isArray(toSource)) {
        let response = []

        for(let i = 0; i < toSource.length; i += 1) {
          let source = toSource[i]

          response.push(mapper(toMapper, source))
        }

        return response
    }

  return mapper(toMapper, toSource)
}
