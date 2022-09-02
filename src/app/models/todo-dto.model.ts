import { Base } from "./base.model";
import { Category } from "./category";

export class TodoDto extends Base {
  public name: string
  public completed: boolean
  public category?: Category | undefined
  public expDate?: Date

  constructor(name:string = '', completed: boolean = false, category=undefined, expDate=undefined) {
    super();
    {
      this.name = name;
      this.completed = completed;
      this.category = category;
      this.expDate = expDate;
    }
  }
}
