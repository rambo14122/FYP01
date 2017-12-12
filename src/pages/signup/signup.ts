import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

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

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public loadingCtrl: LoadingController) {
  }

  signup() {
    /*the following codes are working:*/
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
        this.navCtrl.push('ProfileImgPage');
      }
      else {
        console.log('Error: ' + res);
      }
    });

    /*the above codes are working */



  }

  goback() {
    this.navCtrl.pop();
  }
}
