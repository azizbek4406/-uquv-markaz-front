import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Oqituvchi } from 'src/app/model/oqituvchi';
import { OqituvchiService } from 'src/app/service/oqituvchi.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-oqituvchi',
  templateUrl: './oqituvchi.component.html',
  styleUrls: ['./oqituvchi.component.scss']
})
export class OqituvchiComponent implements OnInit, AfterViewInit {
  oqituvchilar!: Oqituvchi[];
  oqituvchiForm: any;
  tahrirRejim = false;
  showFiller = false;
  isLoading = false;
  isLoadingResult = false;
  isLoadingReached = false;
  DisplayedColumns = ["id", "ism", "familiya", "fan", "info", "amal"];

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements = 0;


  constructor(
    private oqituvchiService: OqituvchiService,
    private fb: FormBuilder,
    private dialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.loadAll(''))
    this.loadAll('');
  }



  ngOnInit(): void {
    this.oqituvchiForm = this.fb.group({
      id: [],
      ism: ['', Validators.required],
      familiya: ['', Validators.required],
      fan: ['', Validators.required],
      info: ['']
    })
    
 
  }

  loadAll(key: any | undefined) {

    this.isLoadingResult = true;
    this.isLoadingReached = true;
    this.oqituvchilar = [];
    let params = {
      key: key,
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      sort: 'id,asc'
    }
    this.oqituvchiService.getAll(params).subscribe(oqituvchilar => {
      this.oqituvchilar = oqituvchilar.content;
      this.totalElements = oqituvchilar.totalElements;
      this.isLoadingResult = false;
      this.isLoadingReached = true;

    },
      error => {
        this.isLoadingResult = false;
        this.isLoadingReached = false;
      })

  }
  ochirish(id: number) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "O`chirish",
        msg: "Siz rostdan ham ushbu O`qituvchini o`chirmoqchimisiz?"
      }
    }).afterClosed().subscribe(data => {
      if (data) {
        this.oqituvchiService.deleteByid(id).subscribe(data => {
          this.loadAll('');
        })
      }
    });

    // if(confirm(`Siz rostdan ham o'chirmoqchimisiz?`))

  }
  save() {
    this.isLoading = true;
    let oqituvchi = this.oqituvchiForm.getRawValue();
    if (!this.tahrirRejim) {
      this.oqituvchiService.create(oqituvchi).subscribe(data => {
        this.loadAll('');
        this.tozalash();
      })
    } else {
      this.oqituvchiService.update(oqituvchi).subscribe(data => {
        this.loadAll('');
        this.tozalash();
      })
    }

  }
  tahrir(oqituvchi: Oqituvchi) {
    this.tahrirRejim = true;
    this.oqituvchiForm.reset(oqituvchi);
    this.accordion.openAll();
  }
  tozalash() {
    this.oqituvchiForm.reset();
    this.tahrirRejim = false;
    this.isLoading = false;
    this.accordion.closeAll();
  }



}



