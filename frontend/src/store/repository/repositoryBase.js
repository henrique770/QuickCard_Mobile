import { BaseModel, types } from './expoSqliteOrm/index'
import BaseEntity from '~/entities/BaseEntity'

import automapper from 'automapper-js'

class RepositoryBase {

    /**
     * 
     * @param {BaseModel} model 
     */
    constructor(model){

        this._model = model
    }

    /**
     * Retrieve entity equivalent to the passed identifier
     * @param {string} id 
     * @returns {Promisse<BaseEntity>} 
     */
    async getById(id) {

        try {
            return await this._model.find(id)
                .then(e => e) 
                .catch( e => {

                    console.log('Error Find Repositorio.', e)
                }) 
            
        } catch (error) {
            console.log('Error Find Repositorio.', error)
            throw error
        }
    }

    
    async all() {
        try {
            return await this._model.all()
                .then(e => e) 
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