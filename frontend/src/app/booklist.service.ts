import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';

import {bookinterface} from './models/newbookmodel'


@Injectable({
  providedIn: 'root'
})
export class BooklistService {
private books:bookinterface[]=[];
private book:bookinterface[];

readonly url = "http://localhost:3000/books"
private books$ = new Subject<bookinterface[]>()
private books1 = new Subject<bookinterface[]>()

  constructor( private http:HttpClient) { }
  getBooks(){
    this.http
    .get<{books:bookinterface[]}>(this.url)
    .pipe(
      map((bookData)=>{
        return bookData.books;
      })
    )
    .subscribe((books)=>{
      this.books = books;
      // console.log(books)
      this.books$.next(this.books);
    })
  }
  getBook(bookId:any ){
   return this.http
    .get<{book:bookinterface[]}>("http://localhost:3000/books/"+bookId)

  }


  getBooksStream(){
      return this.books$.asObservable();

  }
  deleteBook(id:any){
    // console.log(id)
        return this.http.delete("http://localhost:3000/books/remove/"+id)
      
      }
 getbook(id:any){
 
        return this.http.get("http://localhost:3000/books/"+id)
}
  addBooks(title:string,author:string,genre:string,image:File):void{
    const bookData = new FormData();
    bookData.append("title",title);
    bookData.append("author",author);
    bookData.append("genre",genre);
    bookData.append("image",image);
       this.http
    .post<{book:bookinterface}>(this.url,bookData)
    .subscribe((bookData)=>{
      const book : bookinterface={
        _id:bookData.book._id,
        title:bookData.book.title,
        author:bookData.book.author,
        genre:bookData.book.genre,
        image:bookData.book.image

      };
      // console.log(book)

      this.books.push(book);
      this.books$.next(this.books)
    });
  }
  updateBooks(id:string,title:string,author:string,genre:string,image:File):void{
    const bookData = new FormData();
    bookData.append("id",id)
    bookData.append("title",title);
    bookData.append("author",author);
    bookData.append("genre",genre);
    bookData.append("image",image);
    console.log(bookData)
    this.http
    .put(this.url,bookData)
    .subscribe((bookData)=>{
           console.log(bookData)

       });
  }
  
  
  updateBook(book:any){
    console.log("client update");
    return this.http.put("http://localhost:3000/book/update",book)
    .subscribe((data)=>console.log(data))
    
      }

}
