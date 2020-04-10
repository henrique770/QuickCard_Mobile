
import api from '~/services/api'
import automapper from 'automapper-js'

const RepositoryBase = function(model) {

    let self = this

    this.url = model.prototype.getUrl()

    this.modelName = model.name

    let isRequired = false

    //#region Retrive

    /**
     * Retrieve api information 
     * @returns {Array<Any>} List entity model
     */
    this.getAll = async () => {

        let listEntity = []

        try
        {
            let response = await api.get(self.url)
        
            if(response.status == 200)
            {
                let data = automapper(model, response.data)
                
                listEntity = self._activeModelsFilter(data)
            }
        }   
        catch(err)
        {
            console.log(`Error requet GET repository in url: ${self.url}`, err)
        }
        finally
        {
            return listEntity
        }
    }

    /**
     * Retrieve api information by id
     * @param {string} id identify the model to be sought
     * @returns {any} model 
     */
    this.getById = async (id) => {
        
        let entiy = { }
        
        try
        {
            let response = await api.get(`${self.url}/${id}`)

            if(response.status == 200)
            {
                let data = automapper(model, response.data)
                entiy = data.isActive ? data : { }
            }
        }
        catch(err)
        {
            console.log(`Error requet GET BY ID repository in url: ${self.url}`, err)
        }
        finally
        {
            return entiy
        }
    }

    //#endregion

    //#region PRIVATES FUNCTIONS 

    /**
     * return models that are active
     * @param {Array<Any>} data raw data
     * @returns {Array<any>} processed data
     * 
     * @throws {Exception} Param 'data' is not array type  
     */
    this._activeModelsFilter = data => {

        if(Array.isArray(data))
        {
            return data.filter( e => e.isActive)
        }

        throw "Param 'data' is not array type"
    }

    //#endregion    

}

export default RepositoryBase