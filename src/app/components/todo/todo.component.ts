import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/category';
import { Todo } from 'src/app/models/todo';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';
import { TodoEditFormComponent } from '../todo-edit-form/todo-edit-form.component';

declare var $:any;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoList: Array<Todo> = []
  categoryList: Array<Category> = []
  todo: Todo = new Todo()
  selectedTodo: Todo = new Todo()
  selectedDate: string | undefined = undefined
  faDelete = faTrash
  faEdit = faEdit
  errorMessage: string = ""
  addFormToggleBtnText: string = "Add New Todo";

  constructor(private todoService: TodoService,
    private categoryService: CategoryService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.todo.categoryId = params["categoryId"]
        this.getTodosByCategoryId(params["categoryId"])
      }else{
        if(this.activatedRoute.snapshot.url.length > 1 && this.activatedRoute.snapshot.url[1].path === 'uncategorized'){
          this.getTodosByCategoryId('uncategorized')
        }else{
          this.getTodos()
        }

      }
    })
    this.getCategories()
  }


  @ViewChild("itemName") itemNameField: ElementRef = Input.prototype;
  @ViewChild(TodoEditFormComponent) child:TodoEditFormComponent | undefined;

  getTodos(){
    this.todoService.getAll().subscribe(
      response=>{
        this.todoList = response.data;
      }
    )
  }

  getTodosByCategoryId(categoryId:string){
    this.todoService.getByCategoryId(categoryId).subscribe(
      response=>{
        this.todoList = response.data;
      }
    )
  }

  getCategories(){
    this.categoryService.getAll().subscribe(
      response=>{
        this.categoryList = response.data;
      }
    )
  }

  addItem(){
    this.todoService.add(this.todo).subscribe(
      response=>{
        console.log("Add Messsage: ", response.message)
      }, err => {
        this.errorMessage = "Unexpected error occurred";
        console.log(err);
      }
    )
    this.todoList.push({...this.todo})
    this.todo = new Todo()
    this.itemNameField.nativeElement.focus()
  }

  deleteTodoWatcher(todo: Todo){
    let index = this.todoList.indexOf(todo)
    this.todoList.splice(index,1)
  }

  editTodoWatcher(todo: Todo){
    this.selectedTodo = Object.assign({},todo);
    this.child?.showTodoModal();
  }

  saveTodoWatcher(todo: Todo){
    let itemIndex = this.todoList.findIndex(item => item.id === todo.id);
    if(itemIndex !== -1){
      this.todoList[itemIndex]=todo;
    }
  }

  // todoComplete(todo: Todo){
  //   this.todoList.find(x=> x != undefined && x.name == todo.name)!.completed = !todo.completed
  // }

  onChangeDateValue(event:any){
    this.selectedDate = event.target.value

  }

  setAddFormToggleBtnText(event: any){
      const isExpanded = event.target.getAttribute('aria-expanded')
      this.addFormToggleBtnText = isExpanded === "true" ? 'Hide Todo Add Form' : 'Add New Todo'
  }

}
