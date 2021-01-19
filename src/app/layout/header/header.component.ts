import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  settingPopup:boolean;
  joinButton: boolean = true;
  constructor(private router: Router, public cacheService: CacheService) { }

  ngOnInit(): void {
  }



  logout() {
    this.cacheService.removeCache('token');
    this.router.navigateByUrl('');
    location.reload();
    // location.reload()
  }

  settingsPopup(){
    this.settingPopup=true;
  }
}
