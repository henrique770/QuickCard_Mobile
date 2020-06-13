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
    name: 'DeckEntity',
    service: DeckEntity,
  });

  entities.push({
    name: 'CardEntity',
    service: CardEntity,
  });

  entities.push({
    name: 'NotePadEntity',
    service: NotePadEntity,
  });

  entities.push({
    name: 'NoteEntity',
    service: NoteEntity,
  });

  //#endregion

  return {
    /**
     * @returns {BaseEntity}
     */
    get: name => entities.find(e => e.name == name).service,
  };
})();

export default factoryEntity;
