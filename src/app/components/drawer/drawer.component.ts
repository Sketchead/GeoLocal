import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';
import { DataService,Post } from 'src/app/services/data.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Firestore,getDoc,doc } from '@angular/fire/firestore';

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
  userLogged? = null;
  username = null;
  userType  = null;
  constructor(private plt: Platform, 
    private gestureCtrl: GestureController,
    private dataService: DataService, 
    private auth:Auth,
    private authServ: AuthService,
    private firestore: Firestore) { }

  async ngAfterViewInit() {
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
          drawer.style.transform = `translateY(${-300}px) `;
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

  toggleDrawer() {
    const drawer = this.drawer.nativeElement;
    this.openState.emit(!this.isOpen);

    if (this.isOpen) {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = '';
      this.isOpen = false
    } else {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = `translateY(${-300}px) `;
      this.isOpen = true
    }
  }
  

}
