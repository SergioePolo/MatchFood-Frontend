import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  isLoggedIn : boolean = false;
  //Test
  userLoggedIn (){
    this.isLoggedIn = false;
  }
  ngOnInit(): void {
    this.userLoggedIn();
  }
}
