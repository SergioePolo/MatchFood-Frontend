import { Component, inject, OnInit} from '@angular/core';
import { ServiceRestaurants } from '../../services/restaurants';
import { Restaurant } from '../../interfaces/restaurant';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card implements OnInit{
  _restaurantService = inject(ServiceRestaurants);
  restaurantsList: Restaurant[] = [];

  listRestaurants(){
    this._restaurantService.searchRestaurants().subscribe({
      next:(res:any)=>{
        this.restaurantsList = res.data;
        console.log(this.restaurantsList);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  };
  ngOnInit(): void {
    this.listRestaurants();
  }
}
