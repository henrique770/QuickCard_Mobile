import BaseEntity from '~/entities/BaseEntity';

/**
 * @type Note
 * @typedef Note
 */
class StudentEntity extends BaseEntity {
  constructor(args = {}) {
    super({
      Id : args._id
      , IsActive : args.isActive
    });

    this.Name = args.name;
    this.Email = args.email;
  }


  get Name() { return this._name; }
  set Name(value) { return this._name = value; }

  get Email() { return this._email; }
  set Email(value) { return this._email = value; }

}

export default StudentEntity
