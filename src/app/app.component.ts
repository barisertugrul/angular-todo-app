import { Todo } from './models/todo';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todo-app';

  todoList: Array<Todo> = []
  todo: Todo = new Todo()
  faDelete = faTrash
  faEdit = faEdit

  @ViewChild("itemName") itemNameField: ElementRef = Input.prototype;

  addItem(){
    //this.todo.category = {name: "Genel",color:"primary"}
    this.todoList.push({...this.todo});
    this.todo.name = ""
    this.itemNameField.nativeElement.focus()
  }

  todoComplete(todo: Todo){
    this.todoList.find(x=> x != undefined && x.name == todo.name)!.completed = !todo.completed
  }

  delete(todo: Todo){
    let index = this.todoList.indexOf(todo)
    this.todoList.splice(index,1)
  }
  edit(e:Event, todo: Todo){
    e.stopPropagation()
    console.log(e.currentTarget)
  }
}
