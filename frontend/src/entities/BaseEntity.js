
class BaseEntity {

    constructor(args) {

        this._id = args.Id
        this._isActive = args.IsActive
    }

    get Id() { return this._id }
    set Id(value) { this._id = value }

    get IsActive() { return this._isActive }
    set IsActive(value) { this._isActive = value }
}

export default BaseEntity
