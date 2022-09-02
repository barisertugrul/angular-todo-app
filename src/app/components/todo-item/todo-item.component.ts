import { Category } from 'src/app/models/category';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faCalendarDay, faCommentDots, faEdit, faInfoCircle, faTags, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Todo } from 'src/app/models/todo';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';
import { TodoEditFormComponent } from '../todo-edit-form/todo-edit-form.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  selectedTodo: Todo = new Todo()
  errorMessage: string = ""
  @Input() todoItem: Todo = new Todo();
  @Output() editRequest = new EventEmitter<any>();
  @Output() deleteRequest = new EventEmitter<any>();
  faDelete = faTrash
  faEdit = faEdit
  faInfo = faInfoCircle
  faDate = faCalendarDay
  faDesc = faCommentDots
  faCat = faTags
  bsElement: string = ""
  bsElementId: string = ""
  todoCategory: Category = new Category()

  constructor(private todoService: TodoService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    let divId = this.todoItem.id.replace("-", '');
    this.bsElement = `#todoDescription${divId}`
    this.bsElementId = `todoDescription${divId}`
    this.getTodoCategoryByCategoryId(this.todoItem.categoryId!)
    this.selectedTodo = this.todoItem
  }

  @ViewChild("checkComplete") checkComplete?: ElementRef = Input.prototype;

  getTodoCategoryByCategoryId(categoryId: string){
    this.categoryService.getById(categoryId).subscribe(
      response=>{
       this.todoCategory = response.data;
      }
    )
  }

  delete(todo: Todo){
    this.todoService.delete(todo).subscribe(
      response=>{
        console.log("Delete Messsage: ", response.message)
        this.deleteRequest.emit(todo);
      }
    )
  }

  edit(todo: Todo){
    this.selectedTodo = Object.assign({},todo);
    this.editRequest.emit(todo);
  }

  todoComplete(todo: Todo){
    this.todoItem!.completed = !todo.completed
    this.todoService.update(this.todoItem).subscribe(
      response => {

      }, err => {
        this.errorMessage = "Unexpected error occurred";
        console.log(err);
      }
    );
  }

}
