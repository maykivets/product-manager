import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  // public loading: HTMLIonLoadingElement;  // this is shown as error and not resolved how to import
  public loading: any;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, Validators.email])
      ],
      password: ['',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
    });
  }

  ngOnInit() {
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
      return;
    }
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();

    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.authService.loginUser(email, password).then(
      () => {
        this.loading.dismiss().then(() => {
          this.router.navigateByUrl('profile');
        });
      },
      error => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{text: 'OK', role: 'cancel'}],
          });
          await alert.present();
        });
      }
    );
  }
}
