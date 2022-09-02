import { ResponseModel } from './../models/responseModel';
import { ListResponseModel } from './../models/listResponseModel';
import { Injectable } from '@angular/core';
import { Observable, Subject, of} from 'rxjs';
import { Category } from '../models/category';
import { StorageService } from './storage.service';
import { BaseService } from './base.service';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  storageCategories: Array<Category> = []

  constructor(private localStorageService: StorageService) {
    super();
  }

  getAll(): Observable<ListResponseModel<Category>> {
    //use with API
    //return this.http.get(API_URL);

    //use with local storage
   this.loadCategories()
    let response: ListResponseModel<Category> = {data:this.storageCategories, success:true, message:''}
    return of(response)
  }

  getById(categoryId: string): Observable<SingleResponseModel<Category>> {
    //use with API
    //return this.http.get(`${API_URL}/${categoryId}`);

    //use with local storage
    this.loadCategories()
    let category: any = this.storageCategories.find((cat:Category) =>
      cat.id === categoryId
    );

    let response: SingleResponseModel<Category> = {data: category, success:true, message:''}
    return of(response)
  }

  add(category:Category):Observable<ResponseModel>{
    //use with API
    //return this.http.post(API_URL,category);

    //use with local storage
    category.id = this.uuid()
    this.loadCategories()
    this.storageCategories.push(category)
    this.localStorageService.addToLocalStorage('categoryList', this.storageCategories)
    let response: ResponseModel = {success:true, message:'The category has been successfully added.'}
    return of(response)
  }

  delete(category: Category) {
    //use with API
    //return this.http.delete(`${API_URL}/${category}`);

    //use with local storage
    this.loadCategories()
    this.storageCategories = this.storageCategories.filter( (cat:Category) =>
      cat.id !== category.id
    );
    this.localStorageService.addToLocalStorage('categoryList', this.storageCategories)
    let response: ResponseModel = {success:true, message:'The category has been successfully deleted.'}
    return of(response)
  }

  update(category: Category): Observable<SingleResponseModel<Category>> {
    //use with API
    //return this.http.put(API_URL,category);

    //use with local storage
    this.loadCategories()
    this.storageCategories = this.storageCategories.map((cat:Category) =>
      cat.id === category.id ? category : cat
    );

    this.localStorageService.addToLocalStorage('categoryList', this.storageCategories)
    let response: SingleResponseModel<Category> = {data: category, success:true, message:'The category has been successfully updated.'}
    return of(response)
  }

  loadCategories(){
    this.storageCategories = (this.localStorageService.getFromLocalStorage("categoryList") !== null)
    ? this.localStorageService.getFromLocalStorage("categoryList") : []
  }

}
