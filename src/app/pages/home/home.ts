import { Component } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from "../../componets/carousel/carousel";
import { Card } from "../../componets/card/card"; 
@Component({
  selector: 'app-home',  
  imports: [Carousel, Card],
  templateUrl: './home.html',
  styleUrls: ['./home.css']  
})
export class Home {

}
