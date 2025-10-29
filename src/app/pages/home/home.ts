import { Component } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from "../../components/carousel/carousel";

@Component({
  selector: 'app-home',  
  imports: [Carousel],
  templateUrl: './home.html',
  styleUrls: ['./home.css']  
})
export class Home {

}
