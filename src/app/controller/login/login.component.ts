import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/account.service';
import { JwtUtilService } from 'src/app/core/jwt-util.service';
import { AuthoService } from 'src/app/service/autho.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthoService,
    private router: Router,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.signinForm  = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(6)]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'rememberMe': [true]
    })
    
  }

  login(){
    let loginParol = this.signinForm.getRawValue();
    this.authService.signin(loginParol).subscribe(data=>{
     this.accountService.identity().subscribe(user=>{
        this.router.navigate(['/oquvchi'])       
     });
    })

  }

  veiwPass(i: any) {
    if (i.type.toString() == "password") {
      i.type = "text"
    } else {
      i.type = 'password'
    }
  }


}
