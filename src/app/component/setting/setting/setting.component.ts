import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiKeyService } from 'src/app/services/api-key.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  updateNewApi:FormGroup;

  constructor(private fb: FormBuilder, private apikey : ApiKeyService) { }

  ngOnInit(): void {
      this.updateNewApi = this.fb.group({
        apikey: ['', [Validators.required]],
      });
  }

  submitPopUp(){
    this.apikey.newApiKey(this.updateNewApi.value).subscribe((api:any)=>{
      if(api['success']){
        console.log("Apikey Update successfuly")
      }else{
        console.log("Unable to update the Apikey.")
      }
    })
  }
}
