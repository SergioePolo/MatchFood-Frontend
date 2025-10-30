import { Component, inject, OnInit } from '@angular/core';
import { Reserve } from '../../interfaces/reserve';
import { ReserveService } from '../../services/reserves';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-reserve-restaurant-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reserve-restaurant-form.html',
  styleUrls: ['./reserve-restaurant-form.css']
})
export class ReserveRestaurantForm implements OnInit {
  private _router = inject(Router);
  private _reserveService = inject(ReserveService);
  private route = inject(ActivatedRoute);
  private token = localStorage.getItem('token');

  restaurantId: string | null = null;

  reserveRegisterForm = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    hour: new FormControl('', [Validators.required]),
    people: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    restaurantId: new FormControl('', [Validators.required]),
    comments: new FormControl('', [])
  });

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    if (this.restaurantId) {
      this.reserveRegisterForm.patchValue({ restaurantId: this.restaurantId });
    }
    if (this.token) {
      const decoded: any = jwtDecode(this.token);
      this.reserveRegisterForm.patchValue({ userId: decoded.id });
    }
  }

  handleSubmit() {

    if (this.reserveRegisterForm.invalid) {
      this.reserveRegisterForm.markAllAsTouched();
      return;
    }

    const dateValue = this.reserveRegisterForm.value.date;
    const parsedDate = dateValue ? new Date(dateValue) : new Date();

    const reserveForm: Reserve = {
      date: parsedDate,
      hour: this.reserveRegisterForm.value.hour || '',
      people: this.reserveRegisterForm.value.people || '',
      userId: this.reserveRegisterForm.value.userId || '',
      restaurantId: this.reserveRegisterForm.value.restaurantId || '',
      comments: this.reserveRegisterForm.value.comments || ''
    };
    this._reserveService.createReserve(reserveForm).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Reserva confirmada',
          icon: 'success',
          text: res.mensaje
        }).then(() => {
          this._router.navigate(['/inicio']);
        });
      },
      error: (e: any) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: e.error.mensaje,
          confirmButtonText: 'Intenta nuevamente'
        });
      }
    });
  }
}
