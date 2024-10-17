import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatTableDataSource } from '@angular/material/table';

export interface User {
  id: string; // Adjust type as needed (string or number)
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string; // Adjust type if necessary
  groupName: string;
  date: string; // Adjust type if necessary
}

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent implements OnInit{
  // dataSource = new MatTableDataSource<ProductsElements>([]);
  constructor(private service:AdminService){}
  user: User[] = []; // Specify the type here


  // user=[
  //   {
  //     id:"",
  //     imageBase64:'',
  //     firstName:'',
  //     lastName:'',
  //     email:'',
  //     contact:'',
  //     groupName:'',
  //     date:'',
  //     image: ''
      
  //   }
  
    
  // ]
  // ngOnInit(): void {
  //   this.service.getAllUser().subscribe(res => {
  //     console.log(res);
  //     this.user = res.map((u: any) => ({ 
  //       id: u.id,
  //       imageBase64: u.imageBase64,
  //       firstName: u.firstName,
  //       lastName: u.lastName,
  //       email: u.email,
  //       contact: u.contact,
  //       groupName: u.groupName,
  //       date: u.date
  //     }));
  //   });
  // }

 
ngOnInit(): void {
  this.loadItems()
  
}
  loadItems(): void {
    this.service.getAllUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching menu items', err);
      },
    });
  }

  // ngOnInit(): void {
  //   this.service.getAllUser().subscribe(res => {
  //     console.log(res); // Check the full response here
  //     this.user = res.map((u: any) => ({
  //       id: u.id,
  //       imageBase64: u.imageBase64 || '', // Fallback to empty string
  //       firstName: u.firstName,
  //       lastName: u.lastName,
  //       email: u.email,
  //       contact: u.contact,
  //       groupName: u.groupName,
  //       date: u.date
  //     }));
  //   });
  // }
  
  
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  

}
