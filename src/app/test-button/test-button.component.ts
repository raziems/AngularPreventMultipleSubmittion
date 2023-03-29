
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Observable, Subject } from 'rxjs';
import { exhaustMap, filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-test-button',
  templateUrl:'./test-button.component.html',
  styleUrls: ['./test-button.component.css']  
  
})
export class TestButtonComponent implements OnInit{

  UpdateForm: FormGroup;
  submitted = false;
  btnSub$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {
    this.UpdateForm = new FormGroup({
      input1: new FormControl('', Validators.required),
      input2: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    this.btnSub$.pipe(
      //tap(() => this.submitted = true),
      //filter(() => this.UpdateForm.valid),
      //exhaustMap(() => this.saveRecord(this.UpdateForm.value))
      exhaustMap(ev => interval(1000).pipe(take(5))) //exhaustMap will help to avoid multi clicking to a button
    ).subscribe(data => {
      console.log('Record => ', data);
      //this.submitted = false;
      //this.UpdateForm.reset();
    });

    
  }

  saveRecord(formVal: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };


    return this.http.post(
      `https://jsonplaceholder.typicode.com/posts`,
      JSON.stringify(formVal),
      httpOptions
    );
  }

  
 
 
  
}

