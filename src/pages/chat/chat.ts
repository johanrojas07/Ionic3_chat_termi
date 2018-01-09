import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = '';
  message: string = '';
  _ChatSubscription;
  messages: object[] = [];  


  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    this.username = this.navParams.get('username');    
    this._ChatSubscription = this.db.list('/chat').valueChanges().subscribe( data =>{
      this.messages = data;
    });

  }

  sendMessage() {
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    }).then( () => {

    }).catch( () => {
      
    });
    this.message = '';
  }
  ionViewWillLeave(){
    console.log("user nada");
    this._ChatSubscription.unsubscribe();
    this.db.list('/chat').push({
      specialMessage:true,
      message: `${this.username} has left the room`
    })
  }


  ionViewDidLoad() {
    this.db.list('/chat').push({
      specialMessage:true,
      message: `${this.username} has joined the room`
    })
    
  }

}
