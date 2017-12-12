import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the PassResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pass-reset',
  templateUrl: 'pass-reset.html',
})
export class PassResetPage {
  email: string;

  constructor(public userProvider: UserProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  reset() {
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });
    this.userProvider.passwordreset(this.email).then((res: any) => {
      if (res.success) {
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow the instructions in the email to reset your password');
      }
      else {
        alert.setTitle('Failed');
      }
      alert.present();
      this.navCtrl.pop();
    });
  }

  goback() {
    this.navCtrl.pop();
  }

}
