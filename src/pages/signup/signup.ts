import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {Storage} from "@ionic/storage";
import {FirebaseAuthProvider} from '../../providers/firebase-auth/firebase-auth';
import {userCreds} from '../../models/interfaces/userCreds';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser =
    {
      email: '',
      password: '',
      displayName: ''
    };
  creds = {} as userCreds;

  constructor(public firebaseAuthProvider: FirebaseAuthProvider, public storage: Storage, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public loadingCtrl: LoadingController) {
  }

  signup() {
    var toast = this.toastCtrl.create(
      {
        message: 'Error',
        duration: 3000,
        position: 'top'
      }
    );
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toast.setMessage('All fields are required');
      toast.present();
      return;
    }
    let loader = this.loadingCtrl.create(
      {content: 'Please wait, registration in progress!'});
    loader.present();
    this.userProvider.addNewUser(this.newuser).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.creds.email = this.newuser.email;
        this.creds.password = this.newuser.password;
        this.firebaseAuthProvider.login(this.creds).then((res: any) => {
            if (res === true) {
              this.navCtrl.setRoot('ProfileImgPage');
              this.storage.set('email', this.creds.email);
              this.storage.set('password', this.creds.password)
            }
          }
        ).catch((error) => {
            toast.setMessage(error.message);
            toast.present();
          }
        )
      }
    }).catch((error) => {
      loader.dismiss();
      toast.setMessage(error.message);
      toast.present();
    });

    /*the above codes are working */


  }

  goback() {
    this.navCtrl.pop();
  }
}
