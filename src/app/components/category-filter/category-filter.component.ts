import { TodoService } from 'src/app/services/todo.service';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/category';
import { Todo } from 'src/app/models/todo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  categoryList: Array<Category> = []
  category: Category = new Category()
  selectedCategory: Category = new Category()
  faDelete = faTrash
  faEdit = faEdit
  todoList: Todo[] = []
  active:boolean = true

  constructor(
    private categoryService: CategoryService,
    private todoService: TodoService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getCategories()
    this.activatedRoute.params.subscribe(params=>{
      if(this.activatedRoute.snapshot.url.length === 0){
        this.active = false
      }else{
        this.active = false
      }
    })
    this.getTodos()
  }

  getCategories(){
    this.categoryService.getAll().subscribe(
      response=>{
        this.categoryList = response.data;
      }
    )
  }
  getTodos(){
    this.todoService.getAll().subscribe(
      response=>{
        this.todoList = response.data;
      }
    )
  }

  getTodoCount(categoryId?:string, itemName?:string): number | undefined{
    let todoCount = 0
    if(!categoryId){
      todoCount = this.todoList.length
    }else if (categoryId === 'uncategorized'){
      todoCount = this.todoList.filter(todo => {
        return todo.categoryId?.length === 0
      }).length
    }else{
      todoCount = this.todoList.filter(todo => {
        return todo.categoryId!.includes(categoryId)
      }).length
    }

    return todoCount
  }
}
