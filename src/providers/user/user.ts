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
              photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
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

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.angularFireAuth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.angularFireAuth.auth.currentUser.photoURL,
          uid: this.angularFireAuth.auth.currentUser.uid
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

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          if(userdata[key].uid!=this.angularFireAuth.auth.currentUser.uid)
          {
            temparr.push(userdata[key]);
          }

        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}
