import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent implements OnInit {

  constructor(private service:AdminService){}

  adminGroup = [
    {
      id : "",
      group_name : "",
      createdDate : "",
      description : ""
    }
  ]

  ngOnInit(): void {
    this.service.getAllGroups().subscribe(res=>{
      if(res!==null){
        this.adminGroup = res;
      }
    },err=>{
      console.log(err);
      
    })
  }

}
