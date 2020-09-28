import {
  BaseEntity,
  CardEntity,
  DeckEntity,
  NotePadEntity,
  NoteEntity,
} from '~/entities/index';

const factoryEntity = (() => {
  const entities = [];

  //#region REGISTRE

  entities.push({
    name: 'deckentity',
    service: DeckEntity,
  });

  entities.push({
    name: 'cardentity',
    service: CardEntity,
  });

  entities.push({
    name: 'notepadentity',
    service: NotePadEntity,
  });

  entities.push({
    name: 'noteentity',
    service: NoteEntity,
  });

  //#endregion

  return {
    /**
     * @param name {string}
     * @returns {BaseEntity}
     */
    get: name => {
      if(entities.findIndex(e => e.name == name.toLowerCase()) > -1) {
        return entities.find(e => e.name == name.toLowerCase()).service
      }

      throw `type entities name ${name} not supported in factoryEntity`
    },

  };
})();

export default factoryEntity;
