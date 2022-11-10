import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Auth } from '@angular/fire/auth';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userLogged? = null;
  posts = [];
  constructor(private router: Router,private dataService: DataService, private auth:Auth,
    private alertController: AlertController,private loadingController:LoadingController) {
        this.dataService.getPosts().subscribe(res=>{
          this.posts = res;
        })
        //this.userLogged = this.auth.currentUser.uid;
    }
    
    seePost(id: string){
      this.router.navigate(['/view-post'], {
        queryParams: { id: id  },
      });
    }
    
    createPost(){
      console.log("click");
      this.router.navigate(['/create-post']);
    }
    
    async deletePost(post,confirm){
      if(confirm){
        const loading = await this.loadingController.create()
        await loading.present()
        
        await this.dataService.deletePost(post)
        await loading.dismiss()

        await this.dataService.getPosts().subscribe(res=>{
          this.posts = res;
        })
        this.Done("Eliminado exitoso","La publicacion se ha eliminado con exito")
      }
    }
    
    
    async deleteConfirmation(post) {
      const alert = await this.alertController.create({
        header: '¿Estas seguro?',
        message: "Una vez eliminado, no se podra recuperar",
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'No',
            handler: () => this.deletePost(post,false),
          },
          {
            text: 'Si',
            handler: () => this.deletePost(post,true),
          },
        ],
      });
      
      await alert.present();
    }
    
    
    async Done(header,message) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons:['OK'],
      });
      await alert.present();
    }

    
  }
  