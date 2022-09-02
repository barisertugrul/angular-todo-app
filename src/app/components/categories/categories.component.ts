import { CategoryEditFormComponent } from './../category-edit-form/category-edit-form.component';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryList: Array<Category> = []
  category: Category = new Category()
  selectedCategory: Category = new Category()
  faDelete = faTrash
  faEdit = faEdit

  constructor(private localStorageService: StorageService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  @ViewChild("itemName") itemNameField: ElementRef = Input.prototype;
  @ViewChild(CategoryEditFormComponent) child:CategoryEditFormComponent | undefined;

  getCategories(){
    this.categoryService.getAll().subscribe(
      response=>{
        this.categoryList = response.data;
      }
    )
  }

  addItem(){
    this.categoryService.add(this.category).subscribe(
      response=>{
        console.log("Add Messsage: ", response.message)
      }
    )
    this.categoryList.push({...this.category})
    this.category = new Category()
    this.itemNameField.nativeElement.focus()
  }

  delete(category: Category){
    this.categoryService.delete(category).subscribe(
      response=>{
        console.log("Delete Messsage: ", response.message)
      }
    )
    let index = this.categoryList.indexOf(category)

    this.categoryList.splice(index,1)
  }

  edit(category: Category){
    this.selectedCategory = Object.assign({},category);
    this.child?.showCategoryModal();
  }

  saveCategoryWatcher(category: Category){
    let itemIndex = this.categoryList.findIndex(item => item.id === category.id);
    if(itemIndex !== -1){
      this.categoryList[itemIndex]=category;
    }
  }

  clearCategoryList(){
    this.localStorageService.removeFromLocalStorage('categoryList')
  }

}
