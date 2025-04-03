import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app:AppComponent;
  let compiled: HTMLDivElement;

  //crear un mock component que se utiliza para crear un componente ficticio para este caso el navbar
  @Component({
    selector: 'app-navbar',
    standalone: true,
    template:`<h1>hola mundo</h1>`
  })
  class navbarComponentMock{}

  beforeEach(async () => {

    TestBed.overrideComponent(AppComponent,{
      set:{
        imports: [navbarComponentMock],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    //recomendado
    // await TestBed.configureTestingModule({
    //   imports: [AppComponent],
    //   providers: [provideRouter([])],
    // })
    // .overrideComponent(AppComponent,{
    //   add:{
    //     imports: [navbarComponentMock]
    //   },
    //   remove:{
    //     imports: [NavbarComponent] //se elimina el navbar que esta fisico
    //   }
    // })
    // .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    // expect(true).toBeFalse();

    expect(app).toBeTruthy();
  });

  it(`should render the navbar and router-outlet`, () => {

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();

  });

});
