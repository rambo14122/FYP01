import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/users');

  constructor(public angularFireAuth: AngularFireAuth) {
  }

  addNewUser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.angularFireAuth.auth.currentUser.updateProfile(
          {
            displayName: newuser.displayName,
            photoURL: ''
          }
        ).then(() => {
          this.firedata.child(this.angularFireAuth.auth.currentUser.uid).set(
            {
              uid: this.angularFireAuth.auth.currentUser.uid,
              displayName: newuser.displayName,
              photoURL: ''
            }).then(() => {
            resolve({success: true});
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    });
    return promise;
  }

  passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
        firebase.auth().sendPasswordResetEmail(email).then(() => {
          resolve({success: true});
        }).catch((err) => {
          reject(err);
        })
      }
    );
    return promise;
  }

  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.currentUser.updateProfile({
        displayName: this.angularFireAuth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.angularFireAuth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
}
