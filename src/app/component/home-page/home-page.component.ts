import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BusinessSearchService } from '../../services/business-search.service';
import { ApiKeyService } from '../../services/api-key.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  allSearchData: any;
  searchBusinessForm: FormGroup;
  updateNewApi: FormGroup;
  hideSearchTable: boolean;
  loader:boolean;


  constructor(private fb: FormBuilder, private businessSearchService : BusinessSearchService,
    private apikey : ApiKeyService) { }

  ngOnInit(): void {
    this.onBusinessSearch();
  }
  
  onBusinessSearch() {
    this.searchBusinessForm = this.fb.group({
      keyword: ['', [Validators.required]],
      radius: ['10', [Validators.required]],
    });
  }

  

  onSearchProCustomer() {
    this.loader=true;
    this.businessSearchService.searchingData(
      this.searchBusinessForm.value
    ).subscribe((res:any)=>{
      this.allSearchData = res.data;
      if(res['success']){
        this.loader=false;
        this.hideSearchTable=true;
        console.log("success")
      }else{
        console.log("error")
      }
    })  
  }

  backToSearch(){
    this.hideSearchTable=false;
  }
  
}
