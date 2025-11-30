import { Component, inject, OnInit} from '@angular/core';
import { ServiceRestaurants } from '../../services/restaurants';
import { Restaurant } from '../../interfaces/restaurant';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
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
      },
      error:(error:any)=>{
        this.restaurantsList = [];
      }
    });
  };
  ngOnInit(): void {
    this.listRestaurants();
  }
}
