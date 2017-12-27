import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {RequestsProvider} from "../../providers/requests/requests";

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  myFriends;
  tempArray = [];

  constructor(public requestservice: RequestsProvider, public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }

  searchuser(searchbar) {
    this.myFriends = this.tempArray;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }


    this.myFriends = this.myFriends.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  addbuddy() {
    this.navCtrl.push('AllUsersPage');
  }

  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.events.subscribe('friends', () => {
      this.myFriends = [];
      this.myFriends = this.requestservice.myfriends;
      this.tempArray = this.myFriends;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('friends');
  }

}
