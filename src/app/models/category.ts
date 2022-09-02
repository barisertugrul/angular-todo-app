import { Base } from './base.model';
export class Category extends Base {
  public name: string
  public color: string

  constructor(name:string = '', color: string = "default") {
    super();
    {
      this.name = name;
      this.color = color;
    }
  }
}
