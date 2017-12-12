import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileImgPage } from './profile-img';

@NgModule({
  declarations: [
    ProfileImgPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileImgPage),
  ],
})
export class ProfileImgPageModule {}
