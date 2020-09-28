import {
  DeckModel,
  CardModel,
  NotePadModel,
  NoteModel,
} from '~/store/models/index';

const factoryModel = (() => {
  const models = [];

  models.push(
    {
      name: 'deckmodel',
      service: DeckModel,
    },
    {
      name: 'cardmodel',
      service: CardModel,
    },
    {
      name: 'notepadmodel',
      service: NotePadModel,
    },
    {
      name: 'notemodel',
      service: NoteModel,
    },
  );

  return {
    /**
     * @param name {string}
     * @returns {BaseEntity}
     */
    get: name => {
      if(models.findIndex(e => e.name == name.toLowerCase()) > -1) {
        return models.find(e => e.name == name.toLowerCase()).service
      }

      throw `type models name ${name} not supported in factoryModel`
    },
  };
})();

export default factoryModel;
