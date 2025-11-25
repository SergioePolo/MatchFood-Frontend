import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { serviceAdmin } from '../../services/admin';
import Swal from 'sweetalert2';

interface Preference {
  _id: string;
  count: number;
}

interface DashboardData {
  users: number;
  restaurants: number;
  reserves: number;
  preferences: Preference[];
}

interface Category {
  name: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-admin.html',
  styleUrl: './user-admin.css'
})

export class UserAdmin implements OnInit {
  
  private _adminService = inject(serviceAdmin);
  
  selectedPeriod: number = 180;

  totalUsers: number = 0;
  totalRestaurants: number = 0;
  totalBookings: number = 0;
  categories: Category[] = [];

  ngOnInit(): void {
    this.loadDashboardData();
  }  
  
  private loadDashboardData(): void {
    this._adminService.searchDataAdminDashboard().subscribe({
      next: (res: any) => {
        this.updateDashboard(res.data);
      },
      error: (error: any) => {
        this.showError(error.error.msg);
      }
    })
  }
  
  private updateDashboard(data: DashboardData) {
    this.totalUsers = data.users;
    this.totalRestaurants = data.restaurants;
    this.totalBookings = data.reserves;

    this.categories = data.preferences.map(pref => ({
      name: this.formatCategoryName(pref._id),
      value: pref.count,
      color: this.getCategoryColor(pref._id)
    }));
  }

  private formatCategoryName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  private getCategoryColor(category: string): string {
    const colorMap: Record<string, string> = {
      'pollo': 'color-1',
      'pescado': 'color-2',
      'carne': 'color-3',
      'vegi': 'color-4'
    };
    return colorMap[category.toLowerCase()] || 'color-default';
  }

  private showError(message: string): void {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: message
    });
  }
}