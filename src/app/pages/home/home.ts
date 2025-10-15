import { Component } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from "../../componets/carousel/carousel";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Carousel],
  templateUrl: './home.html',
  styleUrls: ['./home.css']  
})
export class Home {

}
