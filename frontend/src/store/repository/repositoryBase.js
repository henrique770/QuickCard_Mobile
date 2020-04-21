import { BaseModel, types } from './expoSqliteOrm/index'
import factoryEntity from '~/store/factoryEntity'
import BaseEntity from '~/entities/BaseEntity'


import api from '~/services/api'
import automapper from 'automapper-js'


const __dirEntiy = './../../entities'


class RepositoryBase {

    /**
     * 
     * @param {BaseModel} model 
     */
    constructor(model){

        this._model = model
        this._entity =  factoryEntity.get(`${model.tableName}Entity`)  
    }


    /**
     * Process SQLite and Mapper response for entity
     * @param {RepositoryBase} self 
     * @param {any} result 
     */
    _resolverEntity( self, result) {

        try{
            let dataMapper = automapper( self._entity , result ) 

            return dataMapper
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