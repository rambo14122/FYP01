import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {ImgHandlerProvider} from "../../providers/img-handler/img-handler";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the ProfileImgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-img',
  templateUrl: 'profile-img.html',
})
export class ProfileImgPage {

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImgHandlerProvider,
              public zone: NgZone, public userservice: UserProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
  }

  chooseimage() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait while uploading'
    })
    loader.present();
    this.imgservice.uploadimage().then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    });


  }

  updateproceed() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait while proceeding'
    })
    loader.present();
    this.userservice.updateimage(this.imgurl).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot('TabsPage');
      }
      else {
        alert(res);
      }
    })
  }

  proceed() {
    this.navCtrl.setRoot('TabsPage');
  }



}
