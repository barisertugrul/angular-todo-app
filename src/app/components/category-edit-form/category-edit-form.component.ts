import { CategoryService } from 'src/app/services/category.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';

declare var $:any;

@Component({
  selector: 'app-category-edit-form',
  templateUrl: './category-edit-form.component.html',
  styleUrls: ['./category-edit-form.component.css']
})
export class CategoryEditFormComponent implements OnInit {

  @Input() modalCategory: Category = new Category();
  errorMessage: string = ""

  @Output() save = new EventEmitter<any>();

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
  }

  saveCategory(){
    this.categoryService.update(this.modalCategory).subscribe(
      response => {
        this.save.emit(response.data);
        $('#categoryModal').modal('hide');
      }, err => {
        this.errorMessage = "Unexpected error occurred";
        console.log(err);
      });
  }

  showCategoryModal(){
    $('#categoryModal').modal('show');

  }

}
