import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface Category {
id: string;
  categoryId: number;
  name: string;
  notes: number;
  date: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  selectedCategory: any = {};
  editForm: FormGroup; 
  cat: Category[] = [];

  constructor(private service: CategoriesService, private fb: FormBuilder, private toast: ToastrService) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      notes: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.service.getAllCategories().subscribe(res => {
      this.cat = res; // Ensure the response is typed as Category[]
      console.log(res);
    });
    this.onSubmit()
  }

  openEditModal(category: Category): void {
    this.selectedCategory = { ...category };
    this.editForm.patchValue(this.selectedCategory);

    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedCategory = { ...this.selectedCategory, ...this.editForm.value };
      this.service.editCategory(updatedCategory).subscribe(response => {
        // Update the local array with the updated category
        const index = this.cat.findIndex(c => c.categoryId === updatedCategory.categoryId);
        if (index !== -1) {
          this.cat[index] = updatedCategory; // Update the category in the array
        }
  
        this.toast.success("Category Updated Successfully");
        console.log('Category updated:', response);
      }, error => {
        console.error('Error updating category:', error);
      });
    }
  }
  

  deleteCategory(categoryId: string): void {
    this.toast.error("Cannot delete the Category")
  }
  
  
}
