import { observable } from 'mobx';

export default class Task {
  // The ID of the task. This cannot change.
  id = null

  // The following properties can be updated.
  @observable task = ''
  @observable urgency = ''
  @observable completed = false
  @observable subtasks = []

  constructor() {

  }
}
