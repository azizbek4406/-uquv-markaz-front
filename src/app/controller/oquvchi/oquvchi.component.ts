import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, OpenImageComponent, UserInfoDialogComponent } from 'src/app/shared/confirm-dialog.component';
import { Guruh } from 'src/app/model/guruh';
import { GuruhService } from 'src/app/service/guruh.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatAccordion } from '@angular/material/expansion';
import { Oquvchi } from 'src/app/model/oquvchi';
import { OquvchiService } from 'src/app/service/oquvchi.service';
import { environment } from 'src/environments/environment';
import { FaylService } from 'src/app/service/fayl.service';
import { JwtUtilService } from 'src/app/core/jwt-util.service';


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
  isLoadingUpdate = false;
  xatolik = false;
  tulov = false;
  uquvchiactive = false;
  col = '';
  date = Date;
  access = false;

  selectedFile!: any
  fayl!: any

  DisplayedColumns = ["id", "ism", "familiya", "telNomer", "kelganKuni", "kelishilganSumma", "jins", "guruh", "info", "rasm", "tulov", "amal"]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  totalElements = 0;


  constructor(
    private oquvchiService: OquvchiService,
    private guruhService: GuruhService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private faylService: FaylService,
    private jwtUtlsServiceL: JwtUtilService) { }
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
      jins: ['', Validators.required],
      guruh: [null],
      info: [''],
      // active: [true]

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
        this.oquvchiService.deleteByid(id).subscribe(() => {
          this.loadAll('');
        })
      }
    });
  }

  save() {
    this.isLoading = true;
    let oquvchi = this.oquvchiForm.getRawValue();

    if (this.selectedFile) {
      this.faylService.upload(this.selectedFile).subscribe((data: any) => {
        oquvchi.fayl = {
          id: data.id
        }
        this.save2(oquvchi);
      });

    } else {
      this.save2(oquvchi);
    }
  }
  save2(stud: any) {
    stud.guruh = {
      id: stud.guruh
    }
    if (!this.tahrirRejim) {
      this.oquvchiService.create(stud).subscribe(data => {
        this.loadAll('');
        this.tozalash();
      })
    } else {
      this.oquvchiService.update(stud).subscribe(data => {
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

  // sortActive(filt: any) {
  //   this.access = filt._checked
  //   this.activeFilter()
  // }

  // activeFilter(slide?: any) {
  //   if (this.access) {
  //     if (slide) {
  //       this.oquvchiService.getAllByActive(slide._checked).subscribe(data => {
  //         this.oquvchilar = data.content
  //       })
  //     }
  //   } else {
  //     this.loadAll('')
  //   }
  // }


  tasdiqlash(oquvchi: any) {
    oquvchi.tasdiq = true;

    this.dialog.open(UserInfoDialogComponent, {
      data: {
        user: oquvchi
      }
    })
    if (oquvchi.tulovOquvchi == true) {
      this.tulov = true;
    }
  }
  validateRole() {
    let info = this.jwtUtlsServiceL.getInfo();
    if (info) {
      if (info.role.toString() == "DIRECTOR" || info.role.toString() == "ADMIN") {
        return true
      }
    }
    return false
  }

  updateMoney() {
    

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Qayta yuklash",
        msg: "Siz hamma o'quvchilarni tulovlarini qayta yuklaysizmi ?"
      }
    }).afterClosed().subscribe(data => {
      if (data) {
        this.isLoadingResult = true;
        this.oquvchiService.updateMoney().subscribe(data => {

          if (data) this.isLoadingResult = false;

          this.loadAll('')
        })
      }
    });

  }


  selectFile(e: any) {
    this.selectedFile = e.target.files[0];
    if (this.selectedFile) {

      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.fayl = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);


    }
  }

  openFullImage(fayl: any) {
    this.dialog.open(OpenImageComponent, {
      width: "1000px",
      data: {
        fayl: fayl
      }
    })
  }


  getUrl(fayl: any) {
    if (fayl && fayl.id) {
      return environment.baseApi + "/api/fayl/download/" + fayl.id;
    }
    return "./../../assets/no-photo.jpg"
  }
}

