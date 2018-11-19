import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { PasswordValidator } from '../../validators/password.validator';
import emailMask from 'text-mask-addons/dist/emailMask';

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;

  emailMask = emailMask;

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {}

  ionViewWillLoad() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      login: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group
    });
  }



  createAccount(data) {
    this.userProvider.createAccount(data.name, data.login, data.matching_passwords.password, data.email)
      .then((result: any) => {
        if (result.success) {
          this.toast.create({ message: 'Usuario cadastrado com sucesso', position: 'botton', duration: 5000 }).present();
          this.navCtrl.pop()
          .then(()=>{
            this.navCtrl.push('LoginPage');
          })
        } else {
          this.toast.create({ message: 'Erro ao cadastrar usuário', position: 'botton', duration: 5000 }).present();
        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao cadastrar usuário.', position: 'botton', duration: 5000 }).present();
      })
  }
  validation_messages = {
    'login': [
      { type: 'required', message: 'Login é obrigatório !' }
    ],
    'name': [
      { type: 'required', message: 'Nome é obrigatório !' }
    ],
    'email': [
      { type: 'required', message: 'Email é obrigatório !' },
      { type: 'pattern', message: 'Digite um email válido !' }
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatória !' },
      { type: 'minlength', message: 'Sua senha deve ter no mínimo 5 caracteres.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Por favor confirme sua senha' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'As senhas não batem !' }
    ]
  };

  goBack() {
    this.navCtrl.pop();
  }


}