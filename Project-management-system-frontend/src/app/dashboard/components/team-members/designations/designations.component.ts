import { Component } from '@angular/core';
import { DesignationsService } from '../../../services/designations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../services/project.service';
import { CategoriesService } from '../../../services/categories.service';

interface designations {
  id: string;
  categoryName: string;
  name: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrl: './designations.component.css'
})
export class DesignationsComponent {
  selectedCategory: any = {};
  editForm: FormGroup; 
  cat: designations[] = [];
  categor: any[] = [];

  constructor(
    private service: DesignationsService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private projectservice: ProjectService,
    private category: CategoriesService
  ) {
    this.editForm = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      name: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.service.getAllDesignations().subscribe(res => {
      this.cat = res;
      console.log(res);
    });
    this.getCategories();
  }

  getCategories() {
    this.category.getAllCategories().subscribe(
      (res: any) => {
        console.log(res);
        this.categor = res; // Assign response to the categor array
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  openEditModal(designations: designations): void {
    this.selectedCategory = { ...designations };
    this.editForm.patchValue(this.selectedCategory);

    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteCategory(categoryId: string): void {
    this.toast.error('Cannot delete the Designation');
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedCategory = { ...this.selectedCategory, ...this.editForm.value };
      
      this.service.updateDesignation(updatedCategory).subscribe(
        (response) => {
          // Update the local array with the updated designation
          const index = this.cat.findIndex(c => c.id === updatedCategory.id);
          if (index !== -1) {
            this.cat[index] = updatedCategory; // Update the designation in the array
          }
  
          this.toast.success('Designation Updated Successfully');
          console.log('Designation updated:', response);
          
          // Close the modal after updating
          const modalElement = document.getElementById('editModal');
          if (modalElement) {
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.hide(); // Hide the modal after successful update
          }
        },
        (error) => {
          console.error('Error updating Designation:', error);
        }
      );
    }
  }
}
