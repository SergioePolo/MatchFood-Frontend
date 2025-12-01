import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveService } from '../../services/reserves';
import Swal from 'sweetalert2';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Restaurant {
  _id: string;
  name: string;
  address: string;
}

interface Reserve {
  _id: string;
  date: string;
  hour: string;
  people: number;
  userId: User | null;
  restaurantId: Restaurant | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-reserve-data-table',
  imports: [CommonModule],
  templateUrl: './reserve-data-table.html',
  styleUrl: './reserve-data-table.css'
})
export class ReserveDataTable implements OnInit {
  private _reserveService = inject(ReserveService);

  reserves: Reserve[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadReserves();
  }

  private loadReserves(): void {
    this.isLoading = true;
    this._reserveService.listReserves().subscribe({
      next: (res: any) => {
        this.reserves = res.data || res.reserves || res || [];
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error loading reserves:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar las reservas',
          icon: 'error',
          confirmButtonColor: '#E97451'
        });
      }
    });
  }

  viewReserveDetails(reserve: Reserve): void {
    const userName = reserve.userId 
      ? `${reserve.userId.firstName} ${reserve.userId.lastName}` 
      : 'Usuario no disponible';
    
    const userEmail = reserve.userId?.email || 'N/A';
    
    const restaurantName = reserve.restaurantId?.name || 'Restaurante no disponible';
    const restaurantAddress = reserve.restaurantId?.address || 'N/A';

    Swal.fire({
      title: 'Detalles de la Reserva',
      html: `
        <div style="text-align: left; padding: 20px;">
          <h3 style="color: #E97451; margin-bottom: 15px;">Información del Usuario</h3>
          <p><strong>Nombre:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          
          <h3 style="color: #E97451; margin-top: 20px; margin-bottom: 15px;">Información del Restaurante</h3>
          <p><strong>Nombre:</strong> ${restaurantName}</p>
          <p><strong>Dirección:</strong> ${restaurantAddress}</p>
          
          <h3 style="color: #E97451; margin-top: 20px; margin-bottom: 15px;">Detalles de la Reserva</h3>
          <p><strong>Fecha:</strong> ${this.formatDate(reserve.date)}</p>
          <p><strong>Hora:</strong> ${reserve.hour}</p>
          <p><strong>Personas:</strong> ${reserve.people}</p>
          <p><strong>Creada:</strong> ${this.formatDateTime(reserve.createdAt)}</p>
          <p><strong>Actualizada:</strong> ${this.formatDateTime(reserve.updatedAt)}</p>
        </div>
      `,
      confirmButtonColor: '#FFD700',
      confirmButtonText: 'Cerrar',
      width: '700px'
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getUserName(reserve: Reserve): string {
    if (!reserve.userId) {
      return 'Usuario no disponible';
    }
    return `${reserve.userId.firstName} ${reserve.userId.lastName}`;
  }

  getRestaurantName(reserve: Reserve): string {
    return reserve.restaurantId?.name || 'Restaurante no disponible';
  }
}