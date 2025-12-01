import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceRestaurants } from '../../services/restaurants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-restaurant-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-profile.html',
  styleUrl: './restaurant-profile.css'
})
export class RestaurantProfile implements OnInit {
  restaurant: any;
  mapUrl!: SafeResourceUrl; 
  
  private route = inject(ActivatedRoute);
  private restaurantService = inject(ServiceRestaurants);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    // ✅ Obtener el ID del restaurante desde la URL
    this.route.paramMap.subscribe(params => {
      const restaurantId = params.get('id');
      
      if (restaurantId) {
        this.cargarRestaurante(restaurantId);
      } else {
        console.error('No se pudo obtener el ID del restaurante desde la URL');
      }
    });
  }

  cargarRestaurante(id: string): void {
    this.restaurantService.searchRestaurantById(id).subscribe({
      next: (data: any) => {
        this.restaurant = data.data;
        console.log('Restaurante cargado:', this.restaurant); // Para debug
        
        if (this.restaurant?.address) {
          const url = `https://www.google.com/maps?q=${encodeURIComponent(this.restaurant.address)}&output=embed`;
          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
      },
      error: (error: any) => {
        console.error('Error al cargar el restaurante:', error);
      }
    });
  }

  verMasResena(review: any): void {
    console.log('Ver más de la reseña:', review);
  }
}