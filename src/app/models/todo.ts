import { Base } from './base.model';

export class Todo extends Base {
  public name: string
  public completed: boolean
  public categoryId?: string | undefined
  public expDate?: Date
  public description?: string

  constructor(name:string = '', completed: boolean = false, categoryId="", expDate=undefined) {
    super();
    {
      this.name = name;
      this.completed = completed;
      this.categoryId = categoryId;
      this.expDate = expDate;
    }
  }

}
