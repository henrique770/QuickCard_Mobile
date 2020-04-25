import { BaseModel, types } from './expoSqliteOrm/index'
import BaseEntity from '~/entities/BaseEntity'

import automapper from 'automapper-js'

class RepositoryBase {

    /**
     * 
     * @param {BaseModel} model 
     */
    constructor(model , entity){

        this._model = model
        this._entity = entity  
    }


    /**
     * Process SQLite and Mapper response for entity
     * @param {RepositoryBase} self 
     * @param {any} result 
     */
    _resolverEntity( self, result) {

        try{
            //let dataMapper = automapper( self._entity , result ) 
            //return dataMapper

            return result
        }
        catch(err)
        {
            console.log('error automapper.'. err)
            throw err;
        }
    }

    /**
     * Retrieve entity equivalent to the passed identifier
     * @param {string} id 
     * @returns {Promisse<BaseEntity>} 
     */
    async getById(id) {

        try {
            return await this._model.find(id)
                .then(e => this._resolverEntity( this , e)) 
                .catch( e => {

                    console.log('Error Find Repositorio.', e)
                }) 
            
        } catch (error) {
            console.log('Error Find Repositorio.', error)
            throw error
        }
    }

    /**
     * @returns {Promise<BaseEntity[]>}
     */
    async all() {
        try {
            return await this._model.all()
                .then(e => this._resolverEntity( this , e)) 
                .catch( e => {

                    console.log('Error Find Repositorio.', e)
                }) 
            
        } catch (error) {
            console.log('Error Find Repositorio.', error)
            throw error
        }
    }

}

export default RepositoryBase