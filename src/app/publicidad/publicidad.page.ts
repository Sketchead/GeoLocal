import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.page.html',
  styleUrls: ['./publicidad.page.scss'],
})
export class PublicidadPage implements OnInit {

  constructor( private router:Router) { }

  async url(){
    this.router.navigateByUrl('/app/home',{replaceUrl:true}); 
  }

  ngOnInit() {
  }

}
