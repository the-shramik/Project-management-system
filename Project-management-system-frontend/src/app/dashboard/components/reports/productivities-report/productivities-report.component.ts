import { Component, OnInit } from '@angular/core';
import { ProductivitiesService } from '../../../services/productivities.service';
import { ProjectService } from '../../../services/project.service';
import { CategoriesService } from '../../../services/categories.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-productivities-report',
  templateUrl: './productivities-report.component.html',
  styleUrls: ['./productivities-report.component.css']
})
export class ProductivitiesReportComponent implements OnInit {
  selectedProject: string= '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  projects: any[] = [];
  productivities: any[]=[];
  categories: any[] = [];
  statuses: string[] = ['Completed', 'In Progress', 'Pending'];

  constructor(private productivity: ProductivitiesService, private projectservice: ProjectService) { }

  ngOnInit(): void {
    this.getproject();
    this.fetchProjectsByproductivity()
    this.fetchProjectsByStatus()
  }

  getproject() {
    this.projectservice.getAllProjects().subscribe(data => {
      console.log(data);
      
  
      this.projects = data;
    });
  }

  fetchProjectsByproductivity() {
    if (this.selectedProject) {
      this.productivity.getProductivitiesByProject(this.selectedProject).subscribe(data => {
        console.log(data);
        
        this.productivities = data;
      });
    }
  }

  fetchProjectsByStatus() {
    if (this.selectedStatus) {
      this.productivity.getProductivitiesByStatus(this.selectedStatus).subscribe(data => {
        console.log(data);
        
        this.productivities = data;
      });
    }
  }

  downloadPDF() {
    const doc = new jsPDF();
    const title = 'productivity Report';

    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Add table
    const tableData = this.productivities.map(productivity => [
      productivity.id,
      productivity.productivityName,
      productivity.projectName,
      productivity.status,
      productivity.duration,
     
    ]);

    // Add autoTable
    autoTable(doc, {
      startY: 30,
      head: [['#', 'productivity Name', 'project Name', 'Status', 'Duration', ]],
      body: tableData,
    });

    // Save the PDF
    doc.save('productivity-report.pdf');
  }

}