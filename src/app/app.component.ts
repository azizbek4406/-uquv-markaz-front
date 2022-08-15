import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { JwtUtilService } from './core/jwt-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'oquvmarkazAngular';
  mobileQuery: MediaQueryList;
  director: any;
  admin: any;
  btnElement1: any;
  btnElement2: any;
  btnElement3: any;
  btnElement4: any;
  btnElement5: any;


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private jwtUtlsService: JwtUtilService, private ElByClassName: ElementRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngAfterViewInit(): void {
    this.btnElement1 = (<HTMLElement>this.ElByClassName.nativeElement).querySelector(
      '.acc1'
    );
    this.btnElement2 = (<HTMLElement>this.ElByClassName.nativeElement).querySelector(
      '.acc2'
    );
    this.btnElement3 = (<HTMLElement>this.ElByClassName.nativeElement).querySelector(
      '.acc3'
    );
    this.btnElement4 = (<HTMLElement>this.ElByClassName.nativeElement).querySelector(
      '.acc4'
    );
    this.btnElement5 = (<HTMLElement>this.ElByClassName.nativeElement).querySelector(
      '.acc5'
    );

  }

  view(){
    let info = this.jwtUtlsService.getInfo();
    if (info) {
      if (info.role == "DIRECTOR") {
        this.director = true
        this.admin = false
        
      }else if (info.role == "ADMIN"){
        this.admin = true
        this.director = false
      }
    }
  }
  

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  validateRole() {
    let info = this.jwtUtlsService.getInfo();
    if (info) {
      if (info.role == "DIRECTOR" || info.role == "ADMIN") {
        return true
      }
    }
    return false
  }
  validateRole1() {
    let info = this.jwtUtlsService.getInfo();
    if (info) {
      if (info.role == "DIRECTOR") {
        return true
      }
    }
    return false
  }



  element1(){
    this.btnElement1.setAttribute("style", "color:white; border: 1px solid blue;");
    this.btnElement2.setAttribute("style", "color:black; border: none;");
    this.btnElement3.setAttribute("style", "color:black; border: none;");
    this.btnElement4.setAttribute("style", "color:black; border: none;");
    this.btnElement5.setAttribute("style", "color:black; border: none;");

    
  }
  element2(){
    this.btnElement2.setAttribute("style", "color:white; border: 1px solid blue;");
    this.btnElement1.setAttribute("style", "color:black; border: none;");
    this.btnElement3.setAttribute("style", "color:black; border: none;");
    this.btnElement4.setAttribute("style", "color:black; border: none;");
    this.btnElement5.setAttribute("style", "color:black; border: none;");

  }
  element3(){
    this.btnElement3.setAttribute("style", "color:white; border: 1px solid blue;");
    this.btnElement2.setAttribute("style", "color:black; border: none;");
    this.btnElement1.setAttribute("style", "color:black; border: none;");
    this.btnElement4.setAttribute("style", "color:black; border: none;");
    this.btnElement5.setAttribute("style", "color:black; border: none;");

  }
  element4(){
    this.btnElement4.setAttribute("style", "color:white; border: 1px solid blue;");
    this.btnElement2.setAttribute("style", "color:black; border: none;");
    this.btnElement3.setAttribute("style", "color:black; border: none;");
    this.btnElement1.setAttribute("style", "color:black; border: none;");
    this.btnElement5.setAttribute("style", "color:black; border: none;");

  }
  element5(){
    this.btnElement5.setAttribute("style", "color:white; border: 1px solid blue;");
    this.btnElement2.setAttribute("style", "color:black; border: none;");
    this.btnElement3.setAttribute("style", "color:black; border: none;");
    this.btnElement4.setAttribute("style", "color:black; border: none;");
    this.btnElement1.setAttribute("style", "color:black; border: none;");

  }
  


}
