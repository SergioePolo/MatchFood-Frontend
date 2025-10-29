import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: '',
  styleUrl: '',})
export class Dashboard {
  selectedPeriod = 180;

  stats = {
    totalUsers: 1240,
    usersGrowth: 12.5,
    usersLastMonth: 1100,

    totalRestaurants: 320,
    restaurantsGrowth: 5.8,
    restaurantsLastMonth: 302,

    totalBookings: 890,
    bookingsGrowth: -2.3,
    bookingsLastMonth: 911,
  };

  categories = [
    { name: 'Italiana', value: 45, color: 'color-1' },
    { name: 'Comida rápida', value: 30, color: 'color-2' },
    { name: 'Japonesa', value: 15, color: 'color-3' },
    { name: 'Mexicana', value: 10, color: 'color-4' },
  ];

  onPeriodChange(): void {
    console.log('Periodo cambiado:', this.selectedPeriod);
  }
}