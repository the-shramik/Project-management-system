import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admingroups',
  templateUrl: './admingroups.component.html',
  styleUrl: './admingroups.component.css'
})
export class AdmingroupsComponent implements OnInit {

  constructor(private service: AdminService, private para: ActivatedRoute,private toast:ToastrService){}
  permissions: any[] = []; 
  // permissions = 
  //   {
  //     id : "",
  //     showPermission : "",
  //     createPermission : "",
  //     editPermission : "",
  //     deletePermission : "",
  //     modules : ""
  //   }
  

  adminGroup = {
    id : "",
    group_name : "",
    Created_date : "",
    description : ""
  }

  form: FormGroup = new FormGroup({
    id : new FormControl(''),
    showPermission : new FormControl(''),
    createPermission : new FormControl(''),
    editPermission : new FormControl(''),
    deletePermission : new FormControl(''),
    modules :new FormControl('')
  })


  adminGroup_id: any
  ngOnInit(): void {

    this.para.paramMap.pipe().subscribe(res=>{
      this.adminGroup_id = res.get("id")
    })

    this.service.getGroupById(this.adminGroup_id).subscribe(res=>{
      if(res!==null){
        this.adminGroup = res;
      }
    })

    this.service.getAllPermissionsById(this.adminGroup_id).subscribe(res=>{
      if(res!==null){
        this.permissions = res;
        console.log(this.permissions);
        
        }
    },err=>{
      console.log(err);
    })
    
  }



  formSubmit(){
    console.log(this.form.value);
  }
 
  onupdate(){
    console.log(this.form.value);

    this.service.updatePermissions(this.form.value).subscribe(() => {
      this.toast.success("update Successfully");

  })


}


}