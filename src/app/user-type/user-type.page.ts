import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.page.html',
  styleUrls: ['./user-type.page.scss'],
})
export class UserTypePage implements OnInit {

  constructor( private fb: FormBuilder, 
    private router:Router,
    private alertController: AlertController,
    private loadingController:LoadingController){ }

  ngOnInit() {
  }

}
