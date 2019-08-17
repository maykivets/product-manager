import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userProfile: any;
  public birthDate: Date;
  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        console.log('userProfileSnapshot', userProfileSnapshot);
        console.log('userProfileSnapshot.data()', userProfileSnapshot.data());

        this.userProfile = userProfileSnapshot.data();
        this.birthDate = userProfileSnapshot.data().birthDate;
      });
  }

  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.router.navigateByUrl('login');
    });
  }

  async updateName(): Promise<void> {
    console.log('this.userProfile', this.userProfile);
    const alert = await this.alertCtrl.create({
      subHeader: 'Your first name & last name',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updateName(data.firstName, data.lastName);
          },
        },
      ],
    });
    await alert.present();
  }

  updateDOB(birthDate: string): void {
    // the (ionChange) can trigger on page load
    // so we want to make sure it’s not undefined
    if (birthDate === undefined) {
      return;
    }
    this.profileService.updateDOB(birthDate).catch(err => {
      console.log('updateDOB err', err);
    });
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log('Email Changed Successfully');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword
          );
          },
        },
      ],
    });
    await alert.present();
  }
}
