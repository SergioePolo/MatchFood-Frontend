import { Component, inject, OnInit } from '@angular/core';
import { ServiceRestaurants } from '../../services/restaurants';
import { Restaurant } from '../../interfaces/restaurant';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  imports: [RouterLink, CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css'
})
export class Carousel implements OnInit{
  _restaurantService = inject(ServiceRestaurants);
  restaurantsList: Restaurant[] = [];

  listRestaurants() {
    this._restaurantService.searchRestaurants().subscribe({
      next: (res: any) => {
        this.restaurantsList = res.data;
      },
      error: (error: any) => {
        this.restaurantsList = [];
      }
    });
  };
  ngOnInit(): void {
    this.listRestaurants();
  }

  removeRestaurant(id: any){
    this.restaurantsList = this.restaurantsList.filter(r => r._id !== id);
  }
}
