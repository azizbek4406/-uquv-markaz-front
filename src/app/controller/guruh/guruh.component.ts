import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Oqituvchi } from 'src/app/model/oqituvchi';
import { OqituvchiService } from 'src/app/service/oqituvchi.service';
import { Sort } from '@angular/material/sort';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog.component';
import { Guruh } from 'src/app/model/guruh';
import { GuruhService } from 'src/app/service/guruh.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-guruh',
  templateUrl: './guruh.component.html',
  styleUrls: ['./guruh.component.scss']
})
export class GuruhComponent implements OnInit, AfterViewInit {
  guruhlar!: Guruh[];
  oqituvchilar!: Oqituvchi[];
  guruhForm: any;
  tahrirRejim = false;
  showFiller = false;
  isLoading = false;
  isLoadingResult = false;
  isLoadingReached = false;
  xatolik = false;
  access = false;
  DisplayedColumns = ["id", "nom", "darsVaqti", "sana", "oqituvchi","oquvchiSon","info", "amal"]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  totalElements = 0;


  time = {hour: 13, minute: 30};

  constructor(
    private guruhService: GuruhService,
    private oqituvchiServise: OqituvchiService,
    private fb: FormBuilder,
    private dialog: MatDialog) { }
  ngAfterViewInit(): void {
   this.paginator.page.subscribe(()=> this.loadAll(''));
    this.loadAll('');
    this.oqituvchiServise.getAll('').subscribe(data=>{
      this.oqituvchilar = data.content;
    })
  }



  ngOnInit(): void {
    this.guruhForm = this.fb.group({
      id: [],
      nom: ['', Validators.required],
      darsVaqti: ['', Validators.required],
      sana: ['', Validators.required],
      oqituvchi: [null],
      oquvchiSon: [],
      info: [''],

    })
    
  }

  loadAll(key: any) { 
    this.isLoadingResult = true;
    this.isLoadingReached = true;
    this.guruhlar = [];
    let params = {
      key: key,
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      sort: 'id,asc'
    }
    this.guruhService.getAll(params).subscribe(guruhlar => {
      this.guruhlar = guruhlar.content;
      this.totalElements = guruhlar.totalElements;
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
        msg: "Siz rostdan ham ushbu Guruhni o`chirmoqchimisiz? O'chirishdan oldin guruhdagi hamma o`quvchilar o`chirilganligiga qarang!"
      }
    }).afterClosed().subscribe(data => {
      if (data) {
        this.guruhService.deleteByid(id).subscribe(data => {
          this.loadAll('');
        })
      }
    });
  }
  save() {
    this.isLoading = true;
    let guruh = this.guruhForm.getRawValue();
    guruh.oqituvchi = {
      id: guruh.oqituvchi
    }
    if (!this.tahrirRejim) {
      this.guruhService.create(guruh).subscribe(data => {
        this.loadAll('');
        this.tozalash();
      })
    } else {
      this.guruhService.update(guruh).subscribe(data => {
        this.loadAll('');
        this.tozalash();
      })
    }

  }


  // sortActive(filt: any) {
  //   this.access = filt._checked  
  //   this.activeFilter()
  // }

  // activeFilter(slide?: any) {
  //   if (this.access) {
  //     if (slide) {
  //       this.guruhService.getAllByActive(slide._checked).subscribe(data => {
  //         this.guruhlar = data.content
  //       })
  //     }
  //   } else {
  //     this.loadAll('')
  //   }
  // } 

  tahrir(guruh: Guruh) {
    this.tahrirRejim = true;
    this.guruhForm.reset(guruh);
    this.xatolik = true;
    this.accordion.openAll();
  }
  tozalash() {
    this.guruhForm.reset();
    this.tahrirRejim = false;
    this.isLoading = false;
    this.xatolik = false;
    this.accordion.closeAll();
  }

  
}





