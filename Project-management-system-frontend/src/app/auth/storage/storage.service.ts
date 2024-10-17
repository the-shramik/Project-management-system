import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router:Router) { }
  public saveuser(user:any){
    if(typeof window !=='undefined'){
      window.localStorage.setItem("user",JSON.stringify(user))
    }
  }

  public logout(){
    if(typeof window !=='undefined'){
      window.localStorage.removeItem("user");
      this.router.navigate(['/'])
    }
  }

  public getuser(){
    if(typeof window !== 'undefined'){
      let user=window.localStorage.getItem("user");
    if(user!=null){
      return JSON.parse(user);
    }
    return null;
    }
  }



  public getUserRole(p0?: boolean){
    if(typeof window !== 'undefined'){
      let user=this.getuser();
      if(user!=null){
        return user.role;
      }else{
        return null;
      }
    }
  }
}
