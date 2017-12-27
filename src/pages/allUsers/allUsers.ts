import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Events} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {RequestsProvider} from '../../providers/requests/requests';
import {addFriendRequest} from "../../models/interfaces/addFriendRequest";
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-allUsers',
  templateUrl: 'allUsers.html',
})
export class AllUsersPage {
  newrequest = {} as addFriendRequest;
  temparr = [];
  filteredusers = [];
  notfriends = [];

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider, public alertCtrl: AlertController,
              public requestservice: RequestsProvider) {
  }


  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.events.subscribe('friends', () => {
      this.notfriends = [];
      this.notfriends = this.requestservice.notfriends;
      this.temparr = this.notfriends;
      this.filteredusers = this.temparr;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('friends');
  }

  searchUser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  sendRequest(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    this.requestservice.checkRequest(this.newrequest).then((res: any) => {
      for (var key in res) {
        if (res[key].sender == this.newrequest.sender) {
          let successalert = this.alertCtrl.create({
            title: 'Pending request',
            subTitle: recipient.displayName + ' is processing your request',
            buttons: ['ok']
          });
          successalert.present();
          return;
        }
      }

      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });

      this.requestservice.sendRequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    });


  }


}
