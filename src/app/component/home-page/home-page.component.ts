import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BusinessSearchService } from '../../services/business-search.service';
import { ApiKeyService } from '../../services/api-key.service'
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MapsAPILoader } from '@agm/core';
import '@types/googlemaps';
declare var google: any;

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
  loader: boolean;
  latandlong: any
  autocomplete: any;
  newSearchData: any;
  lat: any;
  lng: any;
  public searchControl: FormControl;
  displayedColumns: string[] = ["name", "vicinity"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search') public searchElementRef: ElementRef;


  constructor(private fb: FormBuilder, private businessSearchService: BusinessSearchService, private toastrManager: ToastrManager,
    private apikey: ApiKeyService, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit(): void {
    this.onBusinessSearch();
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
    });
  }

  onAddressSearch() {
    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
      });
    });
  }

  onBusinessSearch() {
    this.searchBusinessForm = this.fb.group({
      keyword: ['', [Validators.required]],
      radius: ['2', [Validators.required, Validators.max(50), Validators.min(0.01)]],
    });
  }

  backToSearch() {
    this.hideSearchTable = false;
  }

  onImport() {
    this.businessSearchService.importData(this.allSearchData).subscribe((res: any) => {
      if (res['success']) {
        this.toastrManager['successToastr'](
          'Successfully',
          'Data Imported',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
      } else {
        this.toastrManager['errorToastr'](
          '',
          'Some Data allready Imported',
          // res.error.name,
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
      }
    })
  }

  onSearchProCustomer() {
    var data = { keyword: this.searchBusinessForm.value.keyword, radius: this.searchBusinessForm.value.radius, lat: this.lat, lng: this.lng }
    this.businessSearchService.searchingData(
      data).subscribe((res: any) => {
        this.allSearchData = res.data;
        this.dataSource = new MatTableDataSource(this.allSearchData);
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
