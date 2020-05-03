
import BaseEntity  from './BaseEntity'

class DeckEntity extends BaseEntity {

    constructor()
    {
        super()

        this.Name = ''
        this.Cards = []
        this.Student = {}
    }

}

export default DeckEntity