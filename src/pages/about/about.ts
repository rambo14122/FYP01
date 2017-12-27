import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import firebase from 'firebase';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  avatar: string;
  displayName: string;
  email: string;

  constructor(public storage: Storage, public zone: NgZone, public userservice: UserProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.loaduserdetails();
    this.storage.get("email").then(value => {
      this.email = value;
    })
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot('LoginPage');
    })
  }

}
