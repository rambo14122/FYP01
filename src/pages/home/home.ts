import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {userCreds} from "../../models/interfaces/userCreds";
import {FirebaseAuthProvider} from "../../providers/firebase-auth/firebase-auth";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  creds = {} as userCreds;

  constructor(public  toastCtrl: ToastController, public storage: Storage, public navCtrl: NavController, public firebaseAuthProvider: FirebaseAuthProvider) {
    this.storage.get('email').then((value => {
      this.creds.email = value;
    }));
    this.storage.get('password').then((value => {
      this.creds.password = value;
    }))
  }

  signin() {

    var toast = this.toastCtrl.create(
      {
        message: 'Error',
        duration: 3000,
        position: 'top'
      }
    );
    this.firebaseAuthProvider.login(this.creds).then((res: any) => {
        if (res === true) {
          this.navCtrl.setRoot('TabsPage');
          this.storage.set('email', this.creds.email);
          this.storage.set('password', this.creds.password)
        }
      }
    ).catch((error) => {
        toast.setMessage(error.message);
        toast.present();
      }
    );
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  passwordreset() {
    this.navCtrl.push('PassResetPage');
  }
}
