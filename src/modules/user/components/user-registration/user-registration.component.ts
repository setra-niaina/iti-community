import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async submit() {

    console.log(this.model);

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.form.invalid || this.model.password !== this.model.confirmPassword) {
      return;
    }
    // TODO Enregistrer l'utilisateur via le UserService
    this.userService.search(this.model.username).then((resp) => {
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].username === this.model.username) {
          console.log("nmom d'utilisateur déjà pris");
          break;
        }
        else {
          this.userService.register(this.model.username, this.model.password);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
    this.goToLogin();

  }

  goToLogin() {
    // TODO rediriger l'utilisateur sur "/splash/login"
    this.router.navigate(['/splash/login']);
  }
}
