import { StorageService } from './storage.service';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, of } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends BaseService {

  storageTodos: Array<Todo> = []

  constructor(private localStorageService: StorageService) {
    super();
  }

  getAll(): Observable<ListResponseModel<Todo>> {
    //use with API
    //return this.http.get(API_URL);

    //use with local storage
    this.loadTodos()
    let response: ListResponseModel<Todo> = {data:this.storageTodos, success:true, message:''}
    return of(response)
  }

  getById(todoId: string): Observable<SingleResponseModel<Todo>> {
    //use with API
    //return this.http.get(`${API_URL}/${todoId}`);

    //use with local storage
    this.loadTodos()
    let todo: any = this.storageTodos.find((todo:Todo) =>
      todo.id === todoId
    );

    let response: SingleResponseModel<Todo> = {data: todo, success:true, message:''}
    return of(response)
  }

  getByCategoryId(categoryId: string): Observable<ListResponseModel<Todo>> {
    //use with API
    //return this.http.get(`${API_URL}/${todoId}`);

    //use with local storage
    this.loadTodos()
    let todoList = this.storageTodos //.filter((todo:Todo) =>
    //  todo.categoryId === categoryId
    //);

    if (!categoryId){

    }else if (categoryId === 'uncategorized'){

      todoList = todoList.filter(todo => {
        return todo.categoryId?.length === 0
      })
    }else{
      todoList = todoList.filter(todo => {
        return todo.categoryId!.includes(categoryId)
      })
    }

    let response: ListResponseModel<Todo> = {data: todoList, success:true, message:''}
    return of(response)
  }

  getCountByCategoryId(categoryId: string): Observable<SingleResponseModel<number>> {
    //use with API
    //return this.http.get(`${API_URL}/${todoId}`);

    //use with local storage
    this.loadTodos()
    let todoList = this.storageTodos
    let todoCount = 0
    if(!categoryId){
      todoCount = todoList.length
    }else if (categoryId === 'uncategorized'){
      todoCount = todoList.filter(todo => {
        return todo.categoryId?.length === 0
      }).length
    }else{
      todoCount = todoList.filter(todo => {
        return todo.categoryId!.includes(categoryId)
      }).length
    }

    let response: SingleResponseModel<number> = {data: todoList.length, success:true, message:''}
    return of(response)
  }

  add(todo:Todo):Observable<ResponseModel>{
    //use with API
    //return this.http.post(API_URL,todo);

    //use with local storage
    todo.id = this.uuid()
    this.loadTodos()
    this.storageTodos.push(todo)
    this.localStorageService.addToLocalStorage('todoList', this.storageTodos)
    let response: ResponseModel = {success:true, message:'The todo has been successfully added.'}
    return of(response)
  }

  delete(todo: Todo) {
    //use with API
    //return this.http.delete(`${API_URL}/${todo}`);

    //use with local storage
    this.loadTodos()
    this.storageTodos = this.storageTodos.filter( (todoOnStorage:Todo) =>
      todoOnStorage.id !== todo.id
    );
    this.localStorageService.addToLocalStorage('todoList', this.storageTodos)
    let response: ResponseModel = {success:true, message:'The todo has been successfully deleted.'}
    return of(response)
  }

  update(newTodo: Todo): Observable<SingleResponseModel<Todo>> {
    //use with API
    //return this.http.put(API_URL,todo);

    //use with local storage
    this.loadTodos()
    this.storageTodos = this.storageTodos.map((todo:Todo) =>
      todo.id === newTodo.id ? newTodo : todo
    );

    this.localStorageService.addToLocalStorage('todoList', this.storageTodos)
    let response: SingleResponseModel<Todo> = {data: newTodo, success:true, message:'The todo has been successfully updated.'}
    return of(response)
  }

  loadTodos(){
    this.storageTodos = (this.localStorageService.getFromLocalStorage("todoList") !== null)
    ? this.localStorageService.getFromLocalStorage("todoList") : []
  }
}
