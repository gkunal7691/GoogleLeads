import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessSearchService } from 'src/app/services/business-search.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {

  allBusinesses: any;
  websites: any;
  sendingDataForStatus: any;
  isWebsite: boolean = true 
  displayedColumns: string[] = ["businessName", "phone", "website", "address", "status"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private businessSearchService: BusinessSearchService) { }

  ngOnInit(): void {
    this.allBusinessesData()
  }

  statusChange() {
    var sendStatusData = this.allBusinesses.map((businessIds) => { return businessIds.businessId });
    console.log(sendStatusData)
    this.businessSearchService.updateStatus(sendStatusData).subscribe((res: any) => {
      console.log(res.data)
    })
  }

  website(clicked) {
    if (clicked) {
      this.allBusinesses = this.websites.filter((x) => {
        return x.website == null;
      })
      this.dataSource = new MatTableDataSource(this.allBusinesses);
    } else {
      this.allBusinesses = this.websites;
      this.dataSource = new MatTableDataSource(this.allBusinesses);
    }
  }

  allBusinessesData() {
    this.businessSearchService.getBusinessesData().subscribe((res: any) => {
      this.allBusinesses = res.data;
      this.websites = res.data;
      this.dataSource = new MatTableDataSource(this.allBusinesses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  search(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (searchValue: any, filter) => {
      const dataStr = JSON.stringify(searchValue).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  getPageSizeOptions(): number[] {
    if (this.dataSource.data.length > 500)
      return [10, 50, 100, 500, this.dataSource.paginator?.length];
    else if (this.dataSource.data.length > 100) {
      return [10, 50, 100, this.dataSource.paginator?.length];
    }
    else if (this.dataSource.data.length > 50) {
      return [10, 50, this.dataSource.paginator?.length];
    }
    else if (this.dataSource.data.length > 10) {
      return [10, this.dataSource.paginator?.length];
    }
    else {
      return [10];
    }
  }
}
