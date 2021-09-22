import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  getbooks(){
   return this.http.get("http://localhost:3000/books")

  }
  getauthors(){
    return this.http.get("http://localhost:3000/authors")
 
   }
  getbook(id:any){

    return this.http.get("http://localhost:3000/books"+id)
  }
  getauthor(id:any){

    return this.http.get("http://localhost:3000/authors"+id)
  }
  deleteBook(id:any){
    return this.http.delete("http://localhost:3000/remove/book"+id)
      
      }
deleteAuthor(id:any){
    return this.http.delete("http://localhost:3000/remove/author"+id)
          
      }     
  constructor(private http:HttpClient) { }
}
