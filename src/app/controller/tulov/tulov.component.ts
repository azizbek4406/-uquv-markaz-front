import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { JwtUtilService } from 'src/app/core/jwt-util.service';
import { Oquvchi } from 'src/app/model/oquvchi';
import { Tulov } from 'src/app/model/tulov';
import { OquvchiService } from 'src/app/service/oquvchi.service';
import { TulovService } from 'src/app/service/tulov.service';

@Component({
  selector: 'app-tulov',
  templateUrl: './tulov.component.html',
  styleUrls: ['./tulov.component.scss']
})
export class TulovComponent implements OnInit, AfterViewInit {
  tulovlar!: Tulov[]
  oquvchilar!: Oquvchi[];
  tulovForm: any;

  answerNum!: number
  isLoding = false

  @ViewChild('sort') sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements = 0;

  constructor(
    private tulovService: TulovService,
    private dialog: MatDialog,
    private oquvchiService: OquvchiService,
    private jwtUtlsServiceL: JwtUtilService
  ) { }
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.loadAll(''));
    this.loadAll('')   
    this.oquvchiService.getAll('').subscribe(data => {
      this.oquvchilar = data.content;
    })

    // this.tulovlar.sort = this.sort;
  }

  ngOnInit(): void {
  }



  loadAll(key: any) {
    this.isLoding = true
    let params = {
      key: key,
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      sort: 'id,desc'
    }
    this.tulovService.getAll(params).subscribe(data => {
      this.answerNum = data.totalElements
      this.tulovlar = data.content
      this.isLoding = false


    })  
  }

  validateRole() {
    let info = this.jwtUtlsServiceL.getInfo();
    if (info) {
      if (info.role.toString() == "DIRECTOR") {
        return true
      }
    }
    return false
  }

  tasdiqlash(tulov: Tulov){
    tulov.tulovTasdiq = true; 
    this.tulovService.update(tulov).subscribe(data => {
          
      this.loadAll('');
    })
  }


  refresh() {
    this.loadAll('')
  }

  displayedColumns: string[] = ["id", "oquvchi", "tulovKuni", "oy", "yil", "summa", 'tulovTasdiq']; // For Table

}
