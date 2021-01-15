import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BusinessSearchService } from '../../services/business-search.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  allCategories: any;
  allRadius: any;
  searchBusinessForm: FormGroup;

  constructor(private fb: FormBuilder, private businessSearchService : BusinessSearchService) { }

  ngOnInit(): void {
    this.allCategories = [
      {category: 'Theater'},
      {category: 'Bar'},
      {category: 'Spa'},
    ]
    this.allRadius = [
      { radius: '1 km' },
      { radius: '1.5 km' },
      { radius: '2 km' },
      { radius: '2.5 km' },
    ]
    this.onBusinessSearch();
  }
  
  onBusinessSearch() {
    this.searchBusinessForm = this.fb.group({
      location: ['', [Validators.required]],
      category: ['', [Validators.required]],
      radius: ['', [Validators.required]],
    });
  }

  onSearchProCustomer() {
    this.businessSearchService.searchingData(
      this.searchBusinessForm.value
    ).subscribe((res:any)=>{
      if(res['success']){
        console.log("success")
      }else{
        console.log("error")
      }
    })  
  }
}
