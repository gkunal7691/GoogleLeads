import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  proRoute = '/joinaspro'
  headerIcon: any;
  userId: any;
  joinButton: boolean = true;
  constructor(private router: Router, public cacheService: CacheService) { }

  ngOnInit(): void {
    this.header()
    this.getUser()
  }

  header() {
    let User = this.cacheService.getUserDetails()
    if (User != undefined) {
      this.headerIcon = true
    } else {
      this.headerIcon = false
    }

  }

  getUser() {
    if (this.cacheService.getUserDetails()?.professionalId == null) {
      this.joinButton = true
    } else {
      this.joinButton = false
    }
  }

  onBtnClick() {
    if (this.cacheService.getUserDetails()) {
      this.router.navigateByUrl('joinaspro')
    }else{
      this.router.navigateByUrl('login')
    }
  }

  openPopTemplate(templateRef){
  
  }

  logout() {
    this.cacheService.removeCache('token');
    this.router.navigateByUrl('');
    location.reload();
    // location.reload()
  }

  userProfile() {
    this.router.navigateByUrl('/profile/' + this.cacheService.getUserDetails().userId)
  }
}
