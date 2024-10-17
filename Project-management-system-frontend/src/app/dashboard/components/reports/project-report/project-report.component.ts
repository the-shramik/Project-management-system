import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { CategoriesService } from '../../../services/categories.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';



@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.css']
})
export class ProjectReportComponent implements OnInit {

  selectedCategory: string = '';
  selectedStatus: string = '';
  projects: any[] = [];
  categories: any[] = [];
  statuses: string[] = ['Completed', 'In Progress', 'Pending'];

  constructor(private projectService: ProjectService, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
    this.fetchProjectsByCategory()
    this.fetchProjectsByStatus()
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
  
      this.categories = data;
    });
  }

  fetchProjectsByCategory() {
    if (this.selectedCategory) {
      this.projectService.getProjectsByCategory(this.selectedCategory).subscribe(data => {
        console.log(data);
        
        this.projects = data;
      });
    }
  }

  fetchProjectsByStatus() {
    if (this.selectedStatus) {
      this.projectService.getProjectsByStatus(this.selectedStatus).subscribe(data => {
        console.log(data);
        
        this.projects = data;
      });
    }
  }

  downloadPDF() {
    const doc = new jsPDF();
    const title = 'Project Report';

    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Add table
    const tableData = this.projects.map(project => [
      project.id,
      project.projectName,
      project.category,
      project.status,
      project.duration,
      project.projectManager,
      project.date
    ]);

    // Add autoTable
    autoTable(doc, {
      startY: 30,
      head: [['#', 'Project Name', 'Category', 'Status', 'Duration', 'Project Manager', 'Date']],
      body: tableData,
    });

    // Save the PDF
    doc.save('project-report.pdf');
  }

 
  


 

  
}


