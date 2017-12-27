import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireModule} from "angularfire2";
import {config} from "./firebaseConfig";
import { FirebaseAuthProvider } from '../providers/firebase-auth/firebase-auth';
import {AngularFireAuth} from "angularfire2/auth";
import { UserProvider } from '../providers/user/user';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { ImgHandlerProvider } from '../providers/img-handler/img-handler';
import { IonicStorageModule } from '@ionic/storage';
import { RequestsProvider } from '../providers/requests/requests';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top',scrollAssist: false, autoFocusAssist: false}),
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    FirebaseAuthProvider,
    UserProvider,
    File,
    FileChooser,
    FilePath,
    ImgHandlerProvider,
    RequestsProvider
  ]
})
export class AppModule {}
