import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceUsers } from '../../services/user';
import Swal from 'sweetalert2';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  preferences: string;
  address: string;
  role: string;
}

@Component({
  selector: 'app-user-data-table',
  imports: [CommonModule],
  templateUrl: './user-data-table.html',
  styleUrl: './user-data-table.css'
})
export class UserDataTable implements OnInit {
  private _userService = inject(ServiceUsers);

  users: User[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.isLoading = true;
    this._userService.searchUsers().subscribe({
      next: (res: any) => {
        this.users = res.data || res.users || res || [];
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error loading users:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los usuarios',
          icon: 'error',
          confirmButtonColor: '#E97451'
        });
      }
    });
  }

  editUser(user: User): void {
    // For now, just show an alert - you can implement the edit functionality later
    Swal.fire({
      title: 'Editar Usuario',
      text: `Funcionalidad de edición para ${user.firstName} ${user.lastName}`,
      icon: 'info',
      confirmButtonColor: '#FFD700'
    });
  }

  deleteUser(user: User): void {
    const id = user._id;
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al usuario ${user.firstName} ${user.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E97451',
      cancelButtonColor: '#4A2C2A',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: 'Eliminado',
              text: res.msg,
              icon: 'success',
              confirmButtonColor: '#FFD700'
            });
          },
          error: (error: any) => {
            console.log(error)
            Swal.fire({
              title: 'Error',
              text: error.error,
              icon: 'error',
              confirmButtonColor: '#E97451'
            });
          }
        })
      } else {
      }
      this.loadUsers();
    });
  }
}