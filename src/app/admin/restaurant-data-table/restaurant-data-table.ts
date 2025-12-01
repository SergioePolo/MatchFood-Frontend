import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRestaurants } from '../../services/restaurants';
import Swal from 'sweetalert2';

interface Restaurant {
  _id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  password: string;
  email: string;
  createdAt: string;
  __v: number;
  logo: string;
  description: string;
}

@Component({
  selector: 'app-restaurant-data-table',
  imports: [CommonModule],
  templateUrl: './restaurant-data-table.html',
  styleUrl: './restaurant-data-table.css'
})
export class RestaurantDataTable implements OnInit {
  private _restaurantService = inject(ServiceRestaurants);

  restaurants: Restaurant[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadRestaurants();
  }

  private loadRestaurants(): void {
    this.isLoading = true;
    this._restaurantService.searchRestaurants().subscribe({
      next: (res: any) => {
        this.restaurants = res.data || res.restaurants || res || [];
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error loading restaurants:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los restaurantes',
          icon: 'error',
          confirmButtonColor: '#E97451'
        });
      }
    });
  }

  editRestaurant(restaurant: Restaurant): void {
    // For now, just show an alert - you can implement the edit functionality later
    Swal.fire({
      title: 'Editar Restaurante',
      text: `Funcionalidad de edición para ${restaurant.name}`,
      icon: 'info',
      confirmButtonColor: '#FFD700'
    });
  }

  deleteRestaurant(restaurant: Restaurant): void {
    const id = restaurant._id;
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el restaurante ${restaurant.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E97451',
      cancelButtonColor: '#4A2C2A',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._restaurantService.deleteRestaurant(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: 'Eliminado',
              text: res.msg || 'Restaurante eliminado correctamente',
              icon: 'success',
              confirmButtonColor: '#FFD700'
            });
            this.loadRestaurants();
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              title: 'Error',
              text: error.error.mensaje || 'Error al eliminar el restaurante',
              icon: 'error',
              confirmButtonColor: '#E97451'
            });
          }
        });
      }
    });
  }

  viewRestaurantDetails(restaurant: Restaurant): void {
    Swal.fire({
      title: restaurant.name,
      html: `
        <div style="text-align: left; padding: 20px;">
          <p><strong>Ciudad:</strong> ${restaurant.city}</p>
          <p><strong>Dirección:</strong> ${restaurant.address}</p>
          <p><strong>Teléfono:</strong> ${restaurant.phone}</p>
          <p><strong>Email:</strong> ${restaurant.email}</p>
          <p><strong>Descripción:</strong> ${restaurant.description || 'Sin descripción'}</p>
          <p><strong>Fecha de creación:</strong> ${new Date(restaurant.createdAt).toLocaleDateString()}</p>
        </div>
      `,
      confirmButtonColor: '#FFD700',
      confirmButtonText: 'Cerrar',
      width: '600px'
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}