import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-admin.html',
  styleUrl: './user-admin.css'
})
export class UserAdmin implements OnInit {
  selectedPeriod: number = 180;

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
    { name: 'Carne', value: 45, color: 'color-1' },
    { name: 'Pollo', value: 30, color: 'color-2' },
    { name: 'Pescado', value: 15, color: 'color-3' },
    { name: 'Vegi', value: 10, color: 'color-4' },
  ];

  ngOnInit(): void {}

  

 

  
}