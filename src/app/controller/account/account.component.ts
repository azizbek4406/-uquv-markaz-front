import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Lavozim } from 'src/app/model/lavozim';
import { AuthoService } from 'src/app/service/autho.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup
  acc: any
  tahrirRejim = false;
  isLoading = false;
  lavozim = Lavozim

  a = new Set();
  constructor(
    private _fb: FormBuilder,
    private _authoServie: AuthoService
  ) { }

  @ViewChild(MatAccordion) accordion!: MatAccordion;


  ngOnInit(): void {
    this.accountForm = this._fb.group({
      id: [],
      login: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.loadAll()
  }

  loadAll() {
    this._authoServie.getAll().subscribe(data => {
      this.acc = data.content
    })
  }

  save() {
    this.isLoading = true; 
    let info = this.accountForm.getRawValue();    
    this._authoServie.update(info).subscribe(data => {
      
      this.loadAll()
      this.accordion.closeAll()
    })
    this.isLoading = false;
    
  }

  tozalash() {
    this.accountForm.reset()
    this.accordion.closeAll();
  }

  tahrir(value: any) {
    this.tahrirRejim = true;
    this.accountForm.reset(value);
    this.accordion.openAll()
  }

  DisplayedColumns = ["id", "login", "password", "amal"]

}

