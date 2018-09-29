import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import {FORM_PROVIDERS, FORM_DIRECTIVES} from '@angular2/common';

import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'demo-content-element-dialog',
  styles: [`
    img {
      max-width: 100%;
    }
    .full {
      width: 100%;
    }
  `],
  template: `
  Content Dialog
  <mat-card class="example-card" *ngIf="showlogin">
  <div style="float: right;">
      </div>
  <h1 mat-dialog-title>Ingreso&nbsp;al&nbsp;Servicio&nbsp;&nbsp;&nbsp;<button color="nocolor" mat-icon-button
  mat-dialog-close>X</button></h1>
  <mat-card-content>
    <form class="example-form">
      <table style="width: 100%" cellspacing="0">
        <tr>
          <td>
          <mat-form-field class="full" appearance="outline">
            <mat-label>Email Usuario</mat-label>
            <input matInput placeholder="email" [(ngModel)]="user.email" name="username" required>
            <mat-error>información requerida</mat-error>
            <mat-hint>Indique su email para ingresar</mat-hint>
          </mat-form-field>
          </td>
        </tr>
     <tr>
        <td><mat-form-field class="full" appearance="outline">
        <mat-label>Clave del Usuario</mat-label>
        <input matInput placeholder="Password" [(ngModel)]="user.password" type="password" name="password" required>
        <mat-error>Esta informacion es requerida</mat-error>
        <mat-hint>Indique una clave para ingresar</mat-hint>
        </mat-form-field></td>
      </tr></table>
    </form>
  </mat-card-content>
    <mat-dialog-actions [attr.align]="actionsAlignment">
      <button mat-raised-button
        (click)="confirmLogin()"
         color="primary">Ingresar</button>

     <button
        mat-raised-button
        color="secondary"
        (click)="switchForm()">Registrarse</button>
    </mat-dialog-actions>

</mat-card>
<mat-card *ngIf="!showlogin">
<h1 mat-dialog-title>Registrate&nbsp;con&nbsp;Nosotros&nbsp;<button color="nocolor" mat-icon-button
mat-dialog-close>X</button></h1>
<form>
  <p>
  <mat-form-field class="full" appearance="outline">
    <mat-label>Nombre</mat-label>
      <input matInput [(ngModel)]="user_register.name" name="name" required />
    <mat-error>información requerida</mat-error>
    <mat-hint>Indique su Nombre</mat-hint>
  </mat-form-field>
  </p>
  <p>
  <mat-form-field class="full" appearance="outline">
    <mat-label>Apellidos</mat-label>
      <input matInput [(ngModel)]="user_register.surname" name="surname" required />
    <mat-error>información requerida</mat-error>
    <mat-hint>Indique sus Apellidos</mat-hint>
  </mat-form-field>
  </p>
  <p>
    <mat-form-field class="full" appearance="outline">
      <mat-label>Email Usuario</mat-label>
      <input matInput placeholder="email" [(ngModel)]="user_register.email" name="email" required>
      <mat-error>información requerida</mat-error>
      <mat-hint>Indique su email para ingresar</mat-hint>
    </mat-form-field>
</p>
  <p>
  <mat-form-field class="full" appearance="outline">
        <mat-label>Clave Acceso</mat-label>
        <input matInput placeholder="Password" [(ngModel)]="user_register.password"
         type="setpassword" name="password" required>
        <mat-error>Esta informacion es requerida</mat-error>
        <mat-hint>Indique una clave para ingresar</mat-hint>
  </mat-form-field>
  </p>
</form>
    <mat-dialog-actions [attr.align]="actionsAlignment">
    <button mat-raised-button
      (click)="submitRegister()"
       color="primary">Ingresar</button>

    <button
      mat-raised-button
      color="secondary"
      (click)="switchForm()">is a Login</button>
    </mat-dialog-actions>
    </mat-card>
  `
})


export class ContentDialogComponent {
  actionsAlignment: string;
  showlogin = true;
  register: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;

  public user: User;
  public user_register: User;
  public identity;
  public token;

  // tslint:disable-next-line:max-line-length
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  @Output() loginSuccess = new EventEmitter<any>(true);

  constructor(private frmBuilder: FormBuilder,
     public dialog: MatDialog,
     private _userService: UserService
    ) {
      this.user = new User('', '', '', '', '', '', 'ROLE_USER', 1, '');
      this.user_register = new User('', '', '', '', '', '', 'ROLE_USER', 1, '');
     }

  confirmLogin() {
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.result.user;
        if ( !this.identity) {
            alert('La combinación Usuario / Clave no ha sido reconocida por el Servicio, intente nuevamente')
        } else {
          // crear elemento en el localstorage
          localStorage.setItem('identity', JSON.stringify(this.identity));

          this._userService.signup(this.user, 'true').subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            response => {
                // console.log(" JSONNNN " + JSON.stringify(response.result.token));
              const token = response.result.token;
              this.token = token;
              if ( this.token.length <= 0) {
                alert('el token no se ha generado correctamente')
              } else {
                localStorage.setItem('token', token);
                console.log(token);
                this.user = new User('', '' , '', '', '', '', 'ROLE_USER', 1, '');
                this.loginSuccess.emit(true);
              }
            },
            error => {
              const errorMessage = <any>error;
              if ( errorMessage != null) {
                  console.log(error);
              }
            }
          );
        }
      },
      error => {
          const errorMessage = <any>error;
          if ( errorMessage != null) {
              console.log('error1');
              console.log(error);
          }
      });

    // if ( this.username === 'admin@admin.cl' && this.password === 'admin') {
    //     this.loginSuccess.emit(true);
    //     console.log('this.loginsuccess.emit(true);');
    //       // this.router.navigate(['about']);
    //  } else {
    //    alert("Invalid credentials");
    //  }
  }
  switchForm(){
    this.showlogin = !this.showlogin;
  }
  public alertRegister;

  public submitRegister() {
    console.log(this.user_register);
    this._userService.register(this.user_register).subscribe(
        response =>{
          if (response.error) {
            console.log(response.error);
            alert('error al registrarse');
          }
        // let user = response.user;
        // this.user_register = user;
          if ( response.status) {
            alert(response.result);
          } else {
            // this.alertRegister = "El Regisro se Ha realizado correcticli";
            // this.user_register = new User('','','','','','','ROLE_USER', 1, '');
            // console.log(token);
            console.log(response);
          }
        },
        error => {
          var errorMessage = <any>error;
          if(errorMessage !=null){
            this.alertRegister= error;
              console.log(error);
          }
        }
      )
  }
    //  login() : void {
    //    if(this.username == 'admin@admin.cl' && this.password == 'admin'){
    //     // this.router.navigate(['about']);
    //    }else {
    //      alert("Invalid credentials");
    //    }
    //  }
}

