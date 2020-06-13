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
      name: 'DeckModel',
      service: DeckModel,
    },
    {
      name: 'CardModel',
      service: CardModel,
    },
    {
      name: 'NotePadModel',
      service: NotePadModel,
    },
    {
      name: 'NoteModel',
      service: NoteModel,
    },
  );

  return {
    /**
     * @returns {BaseEntity}
     */
    get: name => models.find(e => e.name == name).service,
  };
})();

export default factoryModel;
