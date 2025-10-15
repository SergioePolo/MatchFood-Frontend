import { Component, signal, inject, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { Header } from './componets/header/header';
import { Footer } from './componets/footer/footer';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  routerNav = inject(Router);
  isVisible : boolean = false;
  hiddenRoutes : string[]= ["/crear-usuario", "/crear-restaurante", "/inicio-de-sesion"];
  //Test

  selectedRoutes (){
    this.routerNav.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isVisible = !this.hiddenRoutes.includes(event.url);
      });
  }
  ngOnInit(): void {
    this.selectedRoutes()  
  }
}
