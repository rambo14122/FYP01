import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {userCreds} from "../../models/interfaces/userCreds";
import {FirebaseAuthProvider} from "../../providers/firebase-auth/firebase-auth";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  creds = {} as userCreds;
  constructor( public navCtrl: NavController, public firebaseAuthProvider: FirebaseAuthProvider) {

  }

  signin() {

    this.navCtrl.setRoot('TabsPage');
    // this.firebaseAuthProvider.login(this.creds).then((res: any) => {
    //     if (!res.code) {
    //      this.navCtrl.setRoot('TabsPage');
    //     }
    //     else {
    //       console.log(res);
    //     }
    //   }
    // );
  }

  signup()
  {
    this.navCtrl.push('SignupPage');
  }
  passwordreset()
  {
    this.navCtrl.push('PassResetPage');
  }
}
