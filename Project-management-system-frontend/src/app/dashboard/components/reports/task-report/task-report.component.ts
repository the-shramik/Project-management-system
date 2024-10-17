import { Component } from '@angular/core';
import { ProductivitiesService } from '../../../services/productivities.service';
import { ProjectService } from '../../../services/project.service';
import { TaskService } from '../../../services/task.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrl: './task-report.component.css'
})
export class TaskReportComponent {

  selectedProject: string= '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  projects: any[] = [];
  task: any[]=[];
  categories: any[] = [];
  statuses: string[] = ['Completed', 'In Progress', 'Pending'];

  constructor(private productivity: ProductivitiesService, private projectservice: ProjectService,private taskservice:TaskService) { }

  ngOnInit(): void {
    this.getproject();
    this.fetchProjectsByTask()
    this.fetchProjectsByStatus()
  }

  getproject() {
    this.projectservice.getAllProjects().subscribe(data => {
      console.log(data);
      
  
      this.projects = data;
    });
  }

  fetchProjectsByTask() {
    if (this.selectedProject) {
      this.taskservice.getTasksByProject(this.selectedProject).subscribe(data => {
        console.log(data);
        
        this.task = data;
        
      });
    }
  }

  fetchProjectsByStatus() {
    if (this.selectedStatus) {
      this.taskservice.getTasksByStatus(this.selectedStatus).subscribe(data => {
        console.log(data);
        
        this.task = data;
      });
    }
  }

  downloadPDF() {
    const doc = new jsPDF();
    const title = 'Task Report';

    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Add table
    const tableData = this.task.map(t => [
      t.id,
      t.taskName,
      t.projectName,
      t.status,
      t.duration,
      
      t.date
    ]);

    // Add autoTable
    autoTable(doc, {
      startY: 30,
      head: [['#', 'Task Name', 'project Name', 'Status', 'Duration', 'Date']],
      body: tableData,
    });

    // Save the PDF
    doc.save('Task-report.pdf');
  }
}

