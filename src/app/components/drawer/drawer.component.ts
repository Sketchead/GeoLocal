import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { Firestore,getDoc,doc,collection } from '@angular/fire/firestore';
import { CommentsService } from 'src/app/services/comments.service';
import { Comments } from 'src/app/services/comments.service';
import { LoadingController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'drawer-comments',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements AfterViewInit {
  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @Output('openStateChanged') openState: EventEmitter<boolean> = new EventEmitter();
  
  isOpen = false;
  openHeight = 0;
  comment:string;
  date = new Date();
  postID ="";
  userLogged? = null;
  comm : Comments;
  comments : Comments[];
  id : string;
  constructor(private plt: Platform, 
    private gestureCtrl: GestureController,
    private auth:Auth,
    private firestore: Firestore,
    private commentsService:CommentsService, 
    private loadingController:LoadingController, 
    private router:Router,) {
      this.commentsService.getComment().subscribe(comments =>{
        this.comments =comments;
        console.log("Comentarios: "+comments);
      });
    }
    
    async ngAfterViewInit() {
      const gauth = getAuth();
      onAuthStateChanged(gauth, (user) => {
        if (user) {
          this.userLogged = this.auth.currentUser.uid;
        } 
      });

      const drawer = this.drawer.nativeElement;
      this.openHeight = (this.plt.height() / 100) * 70;
  
    
      const gesture = await this.gestureCtrl.create({
        el: drawer,
        gestureName: 'swipe',
        direction: 'y',
        onMove: ev => {
          console.log(ev);
          if (ev.deltaY < - this.openHeight) return;
          drawer.style.transform = `translateY(${ev.deltaY}px)`;
        },
        onEnd: ev => {
          console.log('end: ', ev);
          if (ev.deltaY < -50 && !this.isOpen) {
            drawer.style.transition = '.4s ease-out';
            drawer.style.transform = `translateY(${-250}px) `;
            this.openState.emit(true);
            this.isOpen = true
          } else if (ev.deltaY > 50 && this.isOpen) {
            drawer.style.transition = '.4s ease-out';
            drawer.style.transform = '';
            this.openState.emit(false);
            this.isOpen = false
          }
        }
      });
      gesture.enable(true);
    }
    
    getId(){
      var id = window.location.toString().split('=')
      return id[1];
    }

    async onSubmit(){
      this.comm={
        comment:this.comment,
        date: this.date,
        user:this.userLogged,
        postID:this.getId()
      }
      const response = await this.commentsService.addComment(this.comm);
      console.log(response);
      this.commentsService.getComment().subscribe(comments =>{
        console.log();
      });
    }
    async deleteComment(comment){

        const loading = await this.loadingController.create()
        await loading.present()
        
        const response = await this.commentsService.deleteComment(comment);
        console.log(response);
        
        await loading.dismiss()

        await this.commentsService.getComment().subscribe(comments =>{
          this.comments =comments;
          //console.log("Comentarios: "+comments);
        });
    }

    async updateComment(comment:Comments){
          this.comm={
            comment:this.comment,
            date: this.date,
            user:this.userLogged,
            postID:this.getId()
          }
          const response = await this.commentsService.updateComment(this.comm);

          await this.commentsService.getComment().subscribe(comments =>{
            this.comments =comments;
            //console.log("Comentarios: "+comments);
          });
    }

    seePost(id: string){
      this.router.navigate(['/view-post'], {
        queryParams: { id: id  },
      });
    }

    toggleDrawer() {
      const drawer = this.drawer.nativeElement;
      this.openState.emit(!this.isOpen);
      
      if (this.isOpen) {
        drawer.style.transition = '.4s ease-out';
        drawer.style.transform = '';
        this.isOpen = false
      } else {
        drawer.style.transition = '.4s ease-out';
        drawer.style.transform = `translateY(${-250}px) `;
        this.isOpen = true
      }
      
      
    }
    
    
  }
  