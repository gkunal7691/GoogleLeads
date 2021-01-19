import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiKeyService } from 'src/app/services/api-key.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  updateNewApi: FormGroup;
  apikeyTest: string = 'EDIT';
  

  constructor(private fb: FormBuilder, private apikey: ApiKeyService, private toastrManager: ToastrManager) { }

  ngOnInit(): void {
    this.updateNewApi = this.fb.group({
      apikey: ['', [Validators.required]],
    });
    this.apikeyValue();
  }

  apikeyValue() {
    this.apikey.getApiKey().subscribe((res: any) => {
      this.updateNewApi.get('apikey').setValue(res.data[0].apikey);
      this.updateNewApi.disable();
    })
  }

  apikeyUpdate() {
    this.apikey.newApiKey(this.updateNewApi.value).subscribe((api: any) => {
      if(api['success']){
        this.toastrManager['successToastr'](
          'Successfully',
          'API Key Update',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
      }else{
        this.toastrManager['errorToastr'](
          'API key',
          'Unable to update',
          // res.error.name,
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
      }
    })
  }

  submitApikey() {
    if (this.apikeyTest === "EDIT") {
      this.updateNewApi.enable();
      this.apikeyTest = "SAVE";

    } else {
      this.apikeyUpdate()
      this.apikeyTest = "EDIT";
      this.updateNewApi.disable();
    }
  }
}
