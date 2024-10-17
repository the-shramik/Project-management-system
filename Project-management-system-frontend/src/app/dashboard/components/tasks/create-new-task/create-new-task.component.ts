import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css']
})
export class CreateNewTaskComponent implements OnInit {
  projects: any[] = [];  // Store the list of projects

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router,
    private toast: ToastrService
  ) {}

  // Define the form
  form: FormGroup = new FormGroup({
    taskName: new FormControl(''),
    project: new FormControl(''),  // This will store the selected project ID
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    status: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit(): void {
    // Fetch the list of projects when the component is initialized
    this.projectService.getAllProjects().subscribe(
      (data) => {
        console.log('Fetched projects:', data); // Log fetched data for debugging
        if (Array.isArray(data)) {
          this.projects = data;  // Assign the fetched projects to the local array
        } else {
          console.error('Expected an array but got:', data);
        }
      },
      (error) => {
        console.error('Error fetching projects', error);
        this.toast.error('Failed to fetch projects');
      }
    );
  }

  // Submit the form
  formSubmit() {
    console.log('Form value:', this.form.value);
  
    // Ensure the project ID is being sent correctly
    this.taskService.addTask(this.form.value).subscribe(() => {
      this.toast.success('Task Created Successfully');
      this.router.navigate(['/tasks']);
    }, (error) => {
      console.error('Error creating task', error);
      this.toast.error('Failed to create task');
    });
  }
}
