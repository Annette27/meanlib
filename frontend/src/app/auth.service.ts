import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUser(user:any){
    return this.http.post<any>("http://localhost:3000/login",user);
  }
  SignupUser(user:any){
    return this.http.post<any>("http://localhost:3000/signup",user);
  }

  getToken(){
    return localStorage.getItem('token');
  }
  getToken2(){
    return localStorage.getItem('token1');
  }
  loggedAdmin(){
    return !! localStorage.getItem('token') ;
  }
  loggedUser(){
    return !!  localStorage.getItem('token1');
  }
 
  
  constructor(private http:HttpClient) { }
}
