import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceRestaurants } from '../../services/restaurants';
import { Restaurant } from '../../interfaces/restaurant';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-restaurant-profile',
  imports: [CommonModule, RouterLink],
  templateUrl: './restaurant-profile.html',
  styleUrl: './restaurant-profile.css'
})
export class RestaurantProfile implements OnInit{
  _restaurantService = inject(ServiceRestaurants);
  restaurantId: string | null = null;
  restaurant?: Restaurant;

  constructor(private route: ActivatedRoute) {}

  getRestaurantDetails(id: string){
    this._restaurantService.searchRestaurantById(id).subscribe({
      next:(res: any)=>{
        this.restaurant = res.data;
      },
      error:(error:any)=>{
        console.log(error)
      }
    })
  }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id'); 
    if (this.restaurantId) {
      this.getRestaurantDetails(this.restaurantId);
    }
  }
}
