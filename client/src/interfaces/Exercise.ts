import Set from './Set';

export default interface Exercise {
  id: string,
  name: string,
  sets: Set[],
  isAddingNewSet: boolean,
  editSetIdx: number,
}
