import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events, AlertController} from 'ionic-angular';
import {RequestsProvider} from "../../providers/requests/requests";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  myrequests;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider, public events: Events) {

  }




  accept(item) {
    this.requestservice.acceptrequest(item).then(() => {

      let newalert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Tap on the friend to chat with him',
        buttons: ['Okay']
      });
      newalert.present();
    })
  }

  ignore(item) {
    this.requestservice.deleterequest(item).then(() => {
      alert('Request ignored');
    }).catch((err) => {
      alert(err);
    })
  }
  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
  }
  ionViewWillEnter() {
    var list=document.getElementsByTagName("ion-list")[0] as HTMLElement;
    list.style.display="none";
    this.requestservice.getmyrequests();
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
      if(!this.myrequests)
      {
        list.style.display="block";
      }
    })
  }
  viewFriends()
  {
    this.navCtrl.push("FriendsPage");
  }

}
