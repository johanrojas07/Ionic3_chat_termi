import { ChatPage } from './../chat/chat';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username:string = '';

  constructor(public navCtrl: NavController,
  public alertCtrl:AlertController) {

  }

  showAlert(title:string,message:string) {
    let alertBox = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alertBox.present();
  }

  loginUserForm(){
    if(/^[a-zA-Z0-9]+$/.test(this.username)) {
      this.navCtrl.push(ChatPage,{
        username: this.username
      })
    }else{
      this.showAlert('Error','Unvalid Username');
    }
   
  }

}
