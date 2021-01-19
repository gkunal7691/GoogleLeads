import { Component, OnInit } from '@angular/core';
import { BusinessSearchService } from 'src/app/services/business-search.service';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {

  allBusinesses:any;

  constructor(private businessSearchService : BusinessSearchService) {  }

  ngOnInit(): void {
    this.allBusinessesData()
  }
  allBusinessesData(){
    this.businessSearchService.getBusinessesData().subscribe((res:any)=>{
      this.allBusinesses=res.data;
    })
  }
}
