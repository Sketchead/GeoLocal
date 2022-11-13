import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { CameraSource,CameraResultType,Camera,Photo } from '@capacitor/camera'

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.page.html',
  styleUrls: ['./datos-cliente.page.scss'],
})
export class DatosClientePage implements OnInit {



  constructor(private router:Router) { }

  ngOnInit() {
  }

  confirmar(){
    this.router.navigateByUrl('/app/profile',{replaceUrl:true});
  }

}
