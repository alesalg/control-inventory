import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { UserRegistrationRequest } from '../../models/interfaces/users/userRegistration.models';
import { UserAuthRequest } from '../../models/interfaces/users/authUser.models';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public loginCard = true

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  public newUserForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService, private cookieService: CookieService, private messageService: MessageService) {}

  login(): void {
    this.loginForm.markAllAsTouched()
    if(this.loginForm.valid){
      this.userService.authUser(this.loginForm.getRawValue() as UserAuthRequest).subscribe({
        next: (response)=> {
          if(response){
            this.cookieService.set('USER_INFO', response?.token)
            this.loginForm.reset()

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo ${response?.name}`,
              life: 2000
            })
          }
        },
        error: (error)=> {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao fazer o login!`,
            life: 2000
          })
          console.log(error)
        }
      })
    }
  }

  sendNewUser(): void {
    this.newUserForm.markAllAsTouched()
    if(this.newUserForm.valid){
      this.userService.userResgistration(this.newUserForm.getRawValue() as UserRegistrationRequest).subscribe({
        next: (response) => {
          if(response){
            this.newUserForm.reset()
            this.loginCard = true

            this.messageService.add({
              severity: 'success',
              summary: 'Usuário criado com sucesso',
              life: 2000
            })
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao criar usuário!`,
            life: 2000
          })
          console.log(error)
        }
      })
    }
  }

  changeForm(): void {
    this.loginCard = !this.loginCard
    this.loginForm.reset()
    this.newUserForm.reset()
  }
}
