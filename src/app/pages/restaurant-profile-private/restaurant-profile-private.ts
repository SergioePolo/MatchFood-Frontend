import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceRestaurants } from '../../services/restaurants';
import { LoginService } from '../../services/login';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-restaurant-profile-private',
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-profile-private.html',
  styleUrl: './restaurant-profile-private.css'
})
export class RestaurantProfilePrivate implements OnInit {
  restaurant: any;
  mapUrl!: SafeResourceUrl; 
  
  private route = inject(ActivatedRoute);
  private restaurantService = inject(ServiceRestaurants);
  private loginService = inject(LoginService);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    // Obtener el ID del restaurante autenticado, para cargar su perfil
    const restaurantId = this.loginService.getUserId();
    
    if (restaurantId) {
      this.cargarRestaurante(restaurantId);
    } else {
      console.error('No se pudo obtener el ID del restaurante autenticado');
    }
  }

  cargarRestaurante(id: string): void {
    this.restaurantService.searchRestaurantById(id).subscribe({
      next: (data: any) => {
        this.restaurant = data.data;
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

  // Función para ver más detalles de una reseña
  verMasResena(review: any): void {
    // Aquí puedes abrir un modal o navegar a otra página
    console.log('Ver más de la reseña:', review);
  }
}