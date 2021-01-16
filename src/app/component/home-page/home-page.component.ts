import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BusinessSearchService } from '../../services/business-search.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  allSearchData: any;
  searchBusinessForm: FormGroup;

  constructor(private fb: FormBuilder, private businessSearchService : BusinessSearchService) { }

  ngOnInit(): void {
    this.onBusinessSearch();
  }
  
  onBusinessSearch() {
    this.searchBusinessForm = this.fb.group({
      keyword: ['', [Validators.required]],
      // category: ['', [Validators.required]],
      radius: ['', [Validators.required]],
    });
  }

  onSearchProCustomer() {
    this.businessSearchService.searchingData(
      this.searchBusinessForm.value
    ).subscribe((res:any)=>{
      this.allSearchData = res.data;
      if(res['success']){
        console.log("success")
      }else{
        console.log("error")
      }
    })  
  }
}
