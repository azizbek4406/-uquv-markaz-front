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
import { Oquvchi } from 'src/app/model/oquvchi';
import { OquvchiService } from 'src/app/service/oquvchi.service';

@Component({
  selector: 'app-guruh',
  templateUrl: './oquvchi.component.html',
  styleUrls: ['./oquvchi.component.scss']
})
export class OquvchiComponent implements OnInit, AfterViewInit {
  oquvchilar!: Oquvchi[];
  guruhlar!: Guruh[];
  oquvchiForm: any;
  tahrirRejim = false;
  showFiller = false;
  isLoading = false;
  isLoadingResult = false;
  isLoadingReached = false;
  xatolik = false;

  DisplayedColumns = ["id", "ism", "familiya", "telNomer", "kelganKuni", "kelishilganSumma", "jins",  "guruh", "info", "tulov", "amal"]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  totalElements = 0;

  constructor(
    private oquvchiService: OquvchiService,
    private guruhService: GuruhService,
    private fb: FormBuilder,
    private dialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.loadAll(''));
    this.loadAll('');
    this.guruhService.getAll('').subscribe(data => {
      this.guruhlar = data.content;
    })
  }



  ngOnInit(): void {
    this.oquvchiForm = this.fb.group({
      id: [],
      ism: ['', Validators.required],
      familiya: ['', Validators.required],
      telNomer: [''],
      kelganKuni: ['', Validators.required],
      kelishilganSumma: ['', Validators.required],
      jins: ['',Validators.required],
      tulov: ['', Validators.required],
      guruh: [null],
      info: [''],

    })


  }

  loadAll(key: any) {

    this.isLoadingResult = true;
    this.isLoadingReached = true;
    this.oquvchilar = [];
    let params = {
      key: key,
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      sort: 'id,asc'
    }
    this.oquvchiService.getAll(params).subscribe(oquvchilar => {
      this.oquvchilar = oquvchilar.content;
      this.totalElements = oquvchilar.totalElements;

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
        msg: "Siz rostdan ham ushbu O`quvchini o`chirmoqchimisiz?"
      }
    }).afterClosed().subscribe(data => {
      if (data) {
        this.oquvchiService.deleteByid(id).subscribe(data => {
          this.loadAll('');
        })
      }
    });

    // if(confirm(`Siz rostdan ham o'chirmoqchimisiz?`))

  }
  save() {

    this.isLoading = true;
    let oquvchi = this.oquvchiForm.getRawValue();
    oquvchi.guruh = {
      id: oquvchi.guruh
    }
    if (!this.tahrirRejim) {
      this.oquvchiService.create(oquvchi).subscribe(data => {
        this.loadAll('');
        this.tozalash();
      })
    } else {
      this.oquvchiService.update(oquvchi).subscribe(data => {
        this.loadAll('');
        this.tozalash();
      })
    }

  }
  tahrir(oquvchi: Oquvchi) {
    this.tahrirRejim = true;
    this.oquvchiForm.reset(oquvchi);
    this.xatolik = true;
    this.accordion.openAll();
  }
  tozalash() {
    this.oquvchiForm.reset();
    this.tahrirRejim = false;
    this.isLoading = false;
    this.xatolik = false;
    this.accordion.closeAll();
  }


  tasdiqlash(oquvchi: any) {
    oquvchi.tasdiq = true;


  }
}
