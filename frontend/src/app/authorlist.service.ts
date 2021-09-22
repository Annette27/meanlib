import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';


import {authorinterface} from './models/newauthormodel'

@Injectable({
  providedIn: 'root'
})
export class AuthorlistService {
  private authors:authorinterface[]=[];
  private author:authorinterface[];
  
  readonly url = "http://localhost:3000/authors"
  private authors$ = new Subject<authorinterface[]>()
  private authors1 = new Subject<authorinterface[]>()
  
    constructor( private http:HttpClient) { }
    getAuthors(){
      this.http
      .get<{authors:authorinterface[]}>(this.url)
      .pipe(
        map((authorData)=>{
          return authorData.authors;
        })
      )
      .subscribe((authors)=>{
        this.authors = authors;
        // console.log(books)
        this.authors$.next(this.authors);
      })
    }
    getAuthor(authorId:any ){
     return this.http
      .get<{author:authorinterface[]}>("http://localhost:3000/authors/"+authorId)
  
    }
  
  
    getAuthorsStream(){
        return this.authors$.asObservable();
  
    }
    deleteAuthor(id:any){
      console.log(id)
          return this.http.delete("http://localhost:3000/authors/remove/"+id)
        
        }
   getauthor(id:any){
   
          return this.http.get("http://localhost:3000/authors/"+id)
  }
    addAuthors(name:string,countryname:string,genre:string,image:File):void{
      const authorData = new FormData();
      authorData.append("name",name);
      authorData.append("countryname",countryname);
      authorData.append("genre",genre);
      authorData.append("image",image);
      console.log(authorData)
      this.http
      .post<{author:authorinterface}>(this.url,authorData)
      .subscribe((authorData)=>{
        const author : authorinterface={
          _id:authorData.author._id,
         name:authorData.author.name,
          countryname:authorData.author.countryname,
          genre:authorData.author.genre,
          image:authorData.author.image
  
        };
        console.log(author)
  
        this.authors.push(author);
        this.authors$.next(this.authors)
      });
    }
    updateAuthors(id:string,name:string,countryname:string,genre:string,image:File):void{
      const authorData = new FormData();
      authorData.append("id",id)
      authorData.append("name",name);
      authorData.append("countryname",countryname);
      authorData.append("genre",genre);
      authorData.append("image",image);
      // console.log(authorData)
      this.http
      .put(this.url,authorData)
      .subscribe((authorData)=>{
            //  console.log(authorData)
  
         });
    }
    
    
    // updateAuthor(author:any){
    //   console.log("client update");
    //   return this.http.put("http://localhost:3000/author/update",author)
    //   .subscribe((data)=>console.log(data))
      
    //     }
  

}
