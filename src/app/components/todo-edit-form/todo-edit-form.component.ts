import { Category } from 'src/app/models/category';
import { TodoService } from 'src/app/services/todo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { CategoryService } from 'src/app/services/category.service';

declare var $:any;

@Component({
  selector: 'app-todo-edit-form',
  templateUrl: './todo-edit-form.component.html',
  styleUrls: ['./todo-edit-form.component.css']
})
export class TodoEditFormComponent implements OnInit {

  errorMessage: string = ""
  todoItemCategoryList: Array<Category> = []
  selectedDate: string | undefined = undefined
  @Input() modalTodo: Todo = new Todo();
  @Output() save = new EventEmitter<any>();

  constructor(private categoryService:CategoryService, private todoService: TodoService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoryService.getAll().subscribe(
      response=>{
        this.todoItemCategoryList = response.data;
      }
    )
  }

  saveTodo(){
    this.todoService.update(this.modalTodo).subscribe(
      response => {
        this.save.emit(response.data);
        $('#todoModal').modal('hide');
      }, err => {
        this.errorMessage = "Unexpected error occurred";
        console.log(err);
      }
    );
  }

  showTodoModal(){
    $('#todoModal').modal('show');
  }

  onChangeDateValue(event:any){
    this.selectedDate = event.target.value
  }

}
