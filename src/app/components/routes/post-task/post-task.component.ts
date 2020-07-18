import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; import { LoginService } from '../../../services/login.service';
import { CacheService } from '../../../services/cache.service';
import { TaskService } from '../../../services/task.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.css']
})
export class PostTaskComponent implements OnInit {
  allCategories: any;
  joinForm: FormGroup;
  categoryId: any
  categoryListId: any;
  currentViewId = 0
  subCateList = []
  userAddress: any;
  subCategorysList: any;
  isValid: boolean = false;
  taskDetail: any;
  constructor(private cacheService: CacheService, private CategoryService: CategoryService,
    private router: Router, private toastrManager: ToastrManager,
    private fb: FormBuilder, private loginService: LoginService, private taskService: TaskService) { }

  ngOnInit(): void {
    // this.checkUser()
  }

  selectedCategory(categoryId) {
    if (categoryId) {
      this.currentViewId = 1
      console.log(categoryId)
      this.isValid = true;
      this.categoryListId = categoryId
    }
    else {
      this.isValid = false;
    }
  }

  subCategoryListValue(values) {
    this.subCateList = values
    console.log(values)
    if (values === 'Back') {
      this.currentViewId = 0
    }
    else {
      window.scroll(0, 0)
      if (this.cacheService.getCache('token').token != undefined) {
        this.currentViewId = 4
      }
      else {
        this.currentViewId = 3
      }
    }
  }


  addressData(address) {
    if (address === 'Back') {
      this.currentViewId = 4
    }
    else {
      console.log(this.cacheService.getCache('token').token)
      console.log('working', address)
      this.userAddress = address

      let y = [];
      this.subCateList.map(x => {
        y.push(x.subCategoryId)
      })
      let proUserObj = {
        categoryId: parseInt(this.categoryListId),
        subCatagoriesId: y,
        address: this.userAddress,
        title: this.taskDetail.title,
        description: this.taskDetail.description,
        price: this.taskDetail.price,
        user: this.cacheService.getUserDetails()
      }
      console.log('alldata', proUserObj, this.cacheService.getUserDetails())
      this.taskService.createTask(proUserObj).subscribe(res => {
        this.router.navigateByUrl('')
        if (res['success']) {
          this.toastrManager['successToastr'](
            'success',
            'Task created',
            {
              enableHTML: true,
              showCloseButton: true
            }
          );
        }
        else {
          this.toastrManager['errorToastr'](
            'error',
            'Validation Error(s)',
            {
              enableHTML: true,
              showCloseButton: true
            }
          );
        }
      })
    }
  }

  userData(value) {
    console.log(value)
    if (value == 'user') {
      this.currentViewId = 4
    }
    else {
      this.currentViewId = 5
    }
  }


  onLoginEvent(value) {
    console.log(value)
    this.currentViewId = 3
  }

  // checkUser() {
  //   if (this.cacheService.getCache('token').token !== undefined) {
  //     console.log(this.cacheService.getCache('token').token)

  //     // this.userDetails = data

  //   } else {
  //     this.loginService.checkToken().then((data: any) => {
  //       console.log(data)
  //     })
  //   }
  // }

  registration(value) {
    if (value == 'true') {
      this.currentViewId = 3
    }

  }

  taskDetails(task) {
    if (task === 'Back') {
      this.currentViewId = 1
    }
    else {
      if (task) {
        this.currentViewId = 2
        this.taskDetail = task
      }
    }
  }

  // allData() {
  //   let proUserObj = {
  //     categoryId: this.categoryListId,
  //     subCategories: this.subCateList,
  //     address: this.userAddress
  //   }
  //   console.log('alldata', proUserObj)
  // }

  onNext() {
    window.scroll(0, 0)
    this.currentViewId = this.currentViewId + 1
  }
  onBack() {
    window.scroll(0, 0)
    this.currentViewId = this.currentViewId - 1
  }

}
