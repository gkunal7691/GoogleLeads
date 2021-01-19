import { Component, OnInit } from '@angular/core';
import { BusinessSearchService } from 'src/app/services/business-search.service';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {

  allBusinesses:any;
  websites:any;
  isWebsite:boolean=true;

  constructor(private businessSearchService : BusinessSearchService) {  }

  ngOnInit(): void {
    this.allBusinessesData()
  }
  allBusinessesData(){
    this.businessSearchService.getBusinessesData().subscribe((res:any)=>{
      this.allBusinesses = res.data;
      this.websites = res.data;
    })
  }
  website(clicked){
    console.log(clicked)
    if(this.isWebsite==true){
      this.allBusinesses= this.websites.filter((x)=>{
        return x.website==null;
      })
    }else{
      this.websites
    }
  }
}
