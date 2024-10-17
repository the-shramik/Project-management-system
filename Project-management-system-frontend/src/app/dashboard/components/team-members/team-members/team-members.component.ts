import { Component, OnInit } from '@angular/core';
import { TeammemberService } from '../../../services/teammember.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {
  team: any[] = [];
  selectedTeamMember: any = {};
  editForm: FormGroup;
  designations: any[] = []; // Array to hold designations

  constructor(
    private service: TeammemberService,
    private teams: TeammemberService, // Inject the designation service
    private toast: ToastrService,
    private route: Router
  ) {
    this.editForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
      designation: new FormControl(''), // This will hold the designation ID
      address: new FormControl(''),
      date: new FormControl(''),
      image: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadTeamMembers();
    this.loadDesignations(); // Load designations on component init
  }

  loadTeamMembers(): void {
    this.service.getAllTeamMember().subscribe(res => {
      this.team = res;
      console.log(res);
    });
  }

  loadDesignations(): void {
    this.teams.getAllDesignations().subscribe(res => {
      this.designations = res; // Assuming this returns an array of designations
      console.log('Designations:', res);
    });
  }

  openEditModal(member: any): void {
    this.selectedTeamMember = { ...member };
    this.editForm.patchValue(this.selectedTeamMember);
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.editForm.patchValue({ image: file });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const designationSelected = this.editForm.value.designation;
      const imageUpdated = !!this.editForm.value.image; // true if a new image is selected

      // Show messages if designation and image are not updated
      if (!designationSelected) {
        this.toast.warning("Please select a designation.");
      } else if (!imageUpdated && !this.selectedTeamMember.image) {
        this.toast.warning("Please upload a new image or keep the existing one.");
      } else {
        const formData = new FormData();
        console.log('Form values:', this.editForm.value);

        // Append the necessary fields to FormData
        formData.append('id', this.editForm.value.id);
        formData.append('name', this.editForm.value.name);
        formData.append('email', this.editForm.value.email);
        formData.append('contact', this.editForm.value.contact);
        formData.append('address', this.editForm.value.address);
        formData.append('date', this.editForm.value.date);

        // Append designation ID instead of the designation object
        formData.append('designation', designationSelected);

        // Only append new image if uploaded
        if (imageUpdated) {
          formData.append('image', this.editForm.value.image);
        } else {
          // If no new image is uploaded, retain the existing image
          formData.append('image', this.selectedTeamMember.image);
        }

        this.service.updateTeamMember(formData).subscribe(response => {
          console.log(response);
          // After successful update, reload team members
          this.loadTeamMembers(); // Refresh the list of team members

          this.toast.success("Team Member Updated Successfully");
          const modalElement = document.getElementById('editModal');
          if (modalElement) {
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.hide(); // Close the modal after update
          }
        }, error => {
          console.error('Error updating team member:', error);
          this.toast.warning("Please ensure that all fields are selected");
        });
      }
    } else {
      console.error('Form is invalid:', this.editForm.errors);
    }
  }

  deleteteammember(){
    this.toast.warning("Cannot delete the TeamMember")
  }
}
