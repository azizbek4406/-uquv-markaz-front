import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
import { Guruh } from "../model/guruh";
import { Oqituvchi } from "../model/oqituvchi";
import { Oquvchi } from "../model/oquvchi";
import { GuruhService } from "../service/guruh.service";
import { OquvchiService } from "../service/oquvchi.service";
import { TulovService } from "../service/tulov.service";

@Component({
  template: `
    <h1 matDialogTitle>{{title}}</h1>
    
    <mat-dialog-content style="font-size: 19px;">
       {{msg}}
    </mat-dialog-content>
    
    <mat-dialog-actions>
        <button mat-raised-button color="accent" matDialogClose>
          <mat-icon class="mat-18">close</mat-icon>
        Bekor qilish</button>
        <button [disabled]="isLoadingUpdate" mat-raised-button color="primary" (click)="ok()">
        <mat-spinner *ngIf="isLoadingUpdate" style="float: right; top: 8px;left: 5px;" diameter="20"></mat-spinner>
        <mat-icon class="mat-18" color="white">check</mat-icon>  
        Tasdiqlash</button>
        
    </mat-dialog-actions>
    `
})
export class ConfirmDialogComponent {
  title = '';
  msg = '';
  isLoadingUpdate = false

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, msg: string },
  ) {
    this.title = data.title;
    this.msg = data.msg
  }

  ok() {

    this.dialogRef.close(true);

  }
}










@Component({

  template: `
          <h1 >O'quvchi</h1>
          <mat-dialog-content>
          <br><h5>
             ID: {{user.id}}
          </h5>
             
          </mat-dialog-content>
          <hr>
          <mat-dialog-content>
            <h5>
              Ism: {{user.ism}}
            </h5>
              
          </mat-dialog-content>
          <hr>
          <mat-dialog-content>
            <h5>
               Familiya: {{user.familiya}}
            </h5>
             
          </mat-dialog-content>
          <hr>
          <mat-dialog-content>  
            <h5>
              Guruh: {{user.guruh.nom}}
            </h5>
              
          </mat-dialog-content>
          <hr>

          <form [formGroup]="tulovForm" action="" (ngSubmit) = "tulov()">
            To'lanadigan pul miqdori:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="number" name="summa" id="" formControlName="summa"> <br><br>
            Qaysi oy uchun tulov qilinayapti:&nbsp;&nbsp;


            <mat-form-field>
              <mat-label>Oylar</mat-label>
              <mat-select formControlName="oy">
                <mat-option value="Yanvar">Yanvar</mat-option>
                <mat-option value="Fevral">Fevral</mat-option>
                <mat-option value="Mart">Mart</mat-option>
                <mat-option value="Aprel">Aprel</mat-option>
                <mat-option value="May">May</mat-option>
                <mat-option value="Iyun">Iyun</mat-option>
                <mat-option value="Iyul">Iyul</mat-option>
                <mat-option value="Avgust">Avgust</mat-option>
                <mat-option value="Sentabr">Sentabr</mat-option>
                <mat-option value="Oktabr">Oktabr</mat-option>
                <mat-option value="Noyabr">Noyabr</mat-option>
                <mat-option value="Dekabr">Dekabr</mat-option>
              </mat-select>
            </mat-form-field>




            <!-- <input type="text" name="oy" id="" formControlName="oy"> -->
            
            
            <br>
           Yilni tanlang&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <mat-form-field>
              <mat-label>Yil</mat-label>
              <mat-select formControlName="yil">
              
                <mat-option value="2022">2022</mat-option>
                <mat-option value="2023">2023</mat-option>
                <mat-option value="2024">2024</mat-option>
                <mat-option value="2025">2025</mat-option>
                <mat-option value="2026">2026</mat-option>
                <mat-option value="2027">2027</mat-option>
                <mat-option value="2028">2028</mat-option>
                <mat-option value="2029">2029</mat-option>
                <mat-option value="2030">2030</mat-option>
                
              </mat-select>
            </mat-form-field>

            <mat-dialog-actions>
               
              <button mat-raised-button color="warn" matDialogClose>
              <mat-icon class="mat-18">highlight_off</mat-icon>  
              Close</button>
              <button [disabled]="tulovForm.invalid" mat-raised-button color="primary">
              <mat-icon class="mat-18">done_outline</mat-icon>  
              Tulov</button>
          </mat-dialog-actions>
          </form>

          
      `,
  styles: [`
        h1{
          font-size: 25px;
          font-family: cursive;
          text-align: center
        }
        h5{
          font-size: 20px;
          font-family: cursive;
        }
      `]
})

export class UserInfoDialogComponent implements OnInit {
  user!: Oquvchi
  tulovForm!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<UserInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Oquvchi },
    private fb: FormBuilder,
    private tulovSerice: TulovService,
    private oquvchiService: OquvchiService
  ) {
    this.user = data.user
  }
  ngOnInit(): void {
    this.tulovForm = this.fb.group({
      summa: ['', Validators.required],
      oy: ['', Validators.required],
      yil: ['', Validators.required],
    })
  }



  tulov() {
    let date = new Date().toLocaleString()
    let form = this.tulovForm.getRawValue()

    form.oquvchi = this.user
    form.tulovKuni = date

    this.tulovSerice.create(form).subscribe(data => { })
    this.dialogRef.close()
  }
}









@Component({
  template: `
    <h1 matDialogTitle>{{tech.ism}}</h1>
    
    <div class="table-container">
      <table mat-table [dataSource]="guruhs" class="mat-elevation-z8">

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> # </th>
          <td mat-cell *matCellDef="let element"> {{element.id}} </td>
        </ng-container>

        <ng-container matColumnDef="nom">
          <th mat-header-cell *matHeaderCellDef> Nom </th>
          <td mat-cell *matCellDef="let element"> <button (click)="openDialog(element)" mat-raised-button>{{element.nom}}</button> </td>
        </ng-container>

        <ng-container matColumnDef="darsVaqti">
          <th mat-header-cell *matHeaderCellDef>Dars vaqti</th>
          <td mat-cell *matCellDef="let element"> {{element.darsVaqti}} </td>
        </ng-container>

        <ng-container matColumnDef="sana">
          <th mat-header-cell *matHeaderCellDef> Sana </th>
          <td mat-cell *matCellDef="let element"> {{element.sana}} </td>
        </ng-container>

        <ng-container matColumnDef="oquvchiSon">
          <th mat-header-cell *matHeaderCellDef> Oquvchilari soni </th>
          <td mat-cell *matCellDef="let element"> {{element.oquvchiSon}} </td>
        </ng-container>

        <!-- <ng-container matColumnDef="active">
                    <th mat-header-cell *matHeaderCellDef> Active </th>
                    <td mat-cell *matCellDef="let element">
                        <button mat-raised-button [color]="element.active == true ? 'primary' : 'accent'">
                            {{ element.active == true ? 'Active' : 'No-active'}}
                        </button>
                    </td>
                </ng-container> -->

        <ng-container matColumnDef="info">
          <th mat-header-cell *matHeaderCellDef> Info </th>
          <td mat-cell *matCellDef="let element"> {{element.info}} </td>
        </ng-container>

      

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>


      </table>
  
    </div>
    `,
  styles: [`
  h1 {
    text-align: center
  }

  .table-container {
    max-height: 400px;
    overflow: auto;
    height: 400px;
    position: relative;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
      text-align: center;
      border: solid 1px #eee;
    }
  
  `]

})
export class GuruhForTechDialogComponent {
  tech!: Oqituvchi
  guruhs!: Guruh[]

  displayedColumns = ["id", "nom", "darsVaqti", "sana", "oquvchiSon", "info"]

  constructor(
    public dialogRef: MatDialogRef<GuruhForTechDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { oqituvchi: Oqituvchi },
    private guruhService: GuruhService,
    private dialog: MatDialog
  ) {
    this.tech = data.oqituvchi

    this.guruhService.getAllByOqituvchiId(this.tech.id).subscribe(data => {
      this.guruhs = data.content
    })
  }

  openDialog(guruh: Guruh) {
    // this.dialog.closeAll()
    this.dialog.open(OquvchilarDialogComponent, {
      width: "1500px",
      data: {
        guruh: guruh
      }
    })

  }
  
 
}

@Component({
  template: `
    <h1 matDialogTitle>{{guruh.nom}}</h1>
    
    
    <mat-dialog-actions>
      <div class="table-container">
        <table mat-table [dataSource]="oquvchilar" class="mat-elevation-z8">

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> ID </th>
          <td mat-cell *matCellDef="let oquvchi"> 
          <button mat-raised-button [color]="oquvchi.tulovVaqtKeldi == true ? '' : 'accent'">
              ID
            </button>
           </td>  
        </ng-container>

        <ng-container matColumnDef="ism">
          <th mat-header-cell *matHeaderCellDef> Ism </th>
          <td mat-cell *matCellDef="let oquvchi"> {{oquvchi.ism}} </td>
        </ng-container>

        <ng-container matColumnDef="familiya">
          <th mat-header-cell *matHeaderCellDef> Familiya </th>
          <td mat-cell *matCellDef="let oquvchi"> {{oquvchi.familiya}} </td>
        </ng-container>

        <ng-container matColumnDef="telNomer">
          <th mat-header-cell *matHeaderCellDef> Tel Nomer </th>
          <td mat-cell *matCellDef="let oquvchi"> {{oquvchi.telNomer}} </td>
        </ng-container>
        
        <ng-container matColumnDef="rasm">
          <th mat-header-cell *matHeaderCellDef> Rasm </th>
          <td mat-cell *matCellDef="let oquvchi"> 
              <button style="border: none;" (click)="openFullImage(oquvchi.fayl)">
                  <img [src]="getUrl(oquvchi.fayl)" alt="">
              </button>
          </td>
        </ng-container>

        <ng-container matColumnDef="kelishilganSumma">
          <th mat-header-cell *matHeaderCellDef> Kelishilgan Summa </th>
          <td mat-cell *matCellDef="let oquvchi"> {{oquvchi.kelishilganSumma}} </td>
        </ng-container>

        <ng-container matColumnDef="info" >
          <th mat-header-cell *matHeaderCellDef > Info </th>
          <td mat-cell *matCellDef="let oquvchi" style="width: 300px;"> {{oquvchi.info}} </td>
        </ng-container>


          <tr mat-header-row *matHeaderRowDef="DisplayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns:DisplayedColumns;"></tr>
        </table>
      </div>
        
    </mat-dialog-actions>
    `,
  styles: [`
  h1 {
    text-align: center
  }

  .table-container {
    width: 100%;
    max-height: 400px;
    overflow: auto;
    height: 400px;
    position: relative;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
      text-align: center;
      border: solid 1px #eee;
    }
    img{
    height: 50px;
    margin: 5px 10px;
}
  `]
})
export class OquvchilarDialogComponent {
  guruh!: Guruh
  oquvchilar!: Oquvchi[]
  DisplayedColumns = ["id", "ism", "familiya", "telNomer","rasm", "kelishilganSumma", "info"]


  constructor(
    public dialogRef: MatDialogRef<OquvchilarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { guruh: Guruh },
    private oquvchiSerive: OquvchiService,
    private dialog: MatDialog,
  ) {
    this.guruh = this.data.guruh

    this.oquvchiSerive.getAllByGuruxId(this.guruh?.id).subscribe(data => {
      this.oquvchilar = data.content
    })
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


@Component({
  template: `
    <mat-dialog-actions>
    
    
    <img width="100%" [src]="getUrl(this.fayl)" alt=" ">
        
    </mat-dialog-actions>
    `
})
export class OpenImageComponent {
  fayl!: any
  constructor(
    public dialogRef: MatDialogRef<OpenImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fayl: any },
  ) {
    this.fayl = data.fayl
  }

  getUrl(fayl: any) {
    console.log(fayl);

    if (fayl && fayl.id) {
      return environment.baseApi + "/api/fayl/download/" + fayl.id;
    }
    return "./../../assets/no-photo.jpg"
  }
}


