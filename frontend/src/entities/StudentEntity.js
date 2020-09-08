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
    this.ImgPerfil = args.imgPerfil;
  }


  get Name() { return this._name; }
  set Name(value) { return this._name = value; }

  get Email() { return this._email; }
  set Email(value) { return this._email = value; }

  get ImgPerfil() { return this._imgPerfil; }
  set ImgPerfil(value) { return this._imgPerfil = value; }

  get ImgProfile() {
    if(this.ImgPerfil == undefined)
      return require('~/assets/profile.png')

    return { uri : this.ImgPerfil}
  }
}

export default StudentEntity
