import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { resolveDefinition } from '../../../node_modules/@angular/core/src/view/util';
//Taquebrando o    storage qnd tento rodar no celular, acho te tenqe fazer sqlite pro cel
/*
  constructor(private userService: UserService) {
    this.getAuthUser();
  }

  private getAuthUser() {
    this.userService.getOnStorage().then(
      (user) => {
        this.user = user;

        if (!this.user.token) {
          this.navCtrl.push(LoginPage)
        }
      }
    );
  }
*/
@Injectable()
export class UsersProvider {
  // public token: any;

  private apiURL = 'http://localhost:3000/api/';
  // private apiURL = 'https://terapiaic.herokuapp.com/api/';

  constructor(public http: HttpClient, public storage: Storage) { }

  createAccount(name: string, login: string, password: string, email: string) {
    return new Promise((resolve, reject) => {
      var data = {
        name: name,
        login: login,
        password: password,
        email: email
      };

      this.http.post(this.apiURL + 'user/create', data)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error);
          });
    });
  }

  login(login: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        login: login,
        password: password
      };

      this.http.post(this.apiURL + 'auth', data)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error);
          });
    });
  }

  getAll(page: number) {
    return new Promise((resolve, reject) => {

      let url = this.apiURL + 'users/?per_page=10&page=' + page;

      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error);
          });
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      let url = this.apiURL + 'user';
      this.storage.get('token').then((token) => {

        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.get(url, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });
        // return headers;
        // });
      });
    });
  }

  insert(user: any) {
    return new Promise((resolve, reject) => {
      let url = this.apiURL + 'users/';

      this.http.post(url, user)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error);
          });
    });
  }

  updateUser(name: string, email:string) {
    return new Promise((resolve, reject) => {
      let url = this.apiURL + 'user';
      let data = {
        "name": name,
        "email": email
      }
      this.storage.get('token').then((token) => {

        let headers = new HttpHeaders().set('x-access-token', token);
        this.http.put(url, data, { headers })
          .subscribe((result: any) => {
            resolve(result);
          },
            (error) => {
              reject(error);
            });
      });
    });
  }

  remove(id: number) {
    return new Promise((resolve, reject) => {
      let url = this.apiURL + 'users/' + id;

      this.http.delete(url)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error);
          });
    });
  }
}


