import { Component } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from "../../components/carousel/carousel";
import { Card } from "../../components/card/card"; 
@Component({
  selector: 'app-home',  
  imports: [Carousel, Card],
  templateUrl: './home.html',
  styleUrls: ['./home.css']  
})
export class Home {

}
