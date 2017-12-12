import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {userCreds} from "../../models/interfaces/userCreds";

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {

  constructor(public angularFireAuth: AngularFireAuth) {
  }

  login(creds: userCreds) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(creds.email, creds.password).then(() => {
          resolve(true);
        }
      ).catch((err) => {
          reject(err);
        }
      )
    });
    return promise;
  }
}
