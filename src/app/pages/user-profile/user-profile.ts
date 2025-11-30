import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceUsers } from '../../services/user';
import { LoginService } from '../../services/login';
import { User } from '../../interfaces/user';
import { ReserveService } from '../../services/reserves';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile implements OnInit {

  usuario!: User;
  comidasFavoritas: string[] = [];
  resenas: any[] = [];
  reservasActivas: any[] = [];

  constructor(
    private serviceUsers: ServiceUsers,
    private loginService: LoginService,
    private reserveService: ReserveService 
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
    this.cargarResenas();
    this.cargarReservasActivas();
  }

  cargarPerfil(): void {
    const id = this.loginService.getUserId();
    if (id) {
      this.serviceUsers.getUserById(id).subscribe({
        next: (data: any) => {
          this.usuario = data.data;
        },
        error: (err) => {
          console.error('Error al obtener el perfil:', err);
        }
      });
    } else {
      console.error('No se pudo obtener el ID del usuario del token');
    }
  }

  cargarResenas(): void {
    this.resenas = [
      {
        img: 'assets/Static_Cards/sopitas.png',
        lugar: 'Sopitas y frijoladas',
        ciudad: 'Teusaquillo',
        comentario: 'Me gustó la comida, tenia muy buena sazon y buena atencion',
        tiempo: 'Hace 1 mes',
        estrellas: 4
      },
      {
        img:  'assets/Static_Cards/ramen-house.png',
        lugar: 'Ramen House',
        ciudad: 'Chapinero',
        comentario: 'Me gustó mucho la ambientación del lugar, la comida deliciosa.',
        tiempo: 'Hace 2 semanas',
        estrellas: 4.5
      },
      {
        img: 'assets/Static_Cards/puerta-falsa.png',
        lugar: 'La puerta falsa',
        ciudad: 'Chapinero',
        comentario: 'Me encanto el ambiente, la decoracion, la atencion y la comida es espectacular.',
        tiempo: 'Ayer',
        estrellas: 5
      }
    ];
  }

  cargarReservasActivas(): void {
    this.reserveService.getReservesByUser('2').subscribe({
      next: (response: any) => {
        this.reservasActivas = response.data || [];
      },
      error: (err:any) => {
        console.error('Error al cargar reservas:', err);
        this.reservasActivas = [];
      }
    }); 
  } 
}


