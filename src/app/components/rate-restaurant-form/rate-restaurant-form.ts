import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rate-restaurant-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rate-restaurant-form.html',
  styleUrls: ['./rate-restaurant-form.css']
})
export class RateRestaurantForm {
  comentarioPositivo: string = '';
  comentarioMejora: string = '';
  calificacion: number = 0;
  archivos: File[] = [];

  seleccionarCalificacion(valor: number) {
    this.calificacion = valor;
  }

  seleccionarArchivos(event: any) {
    const nuevosArchivos = Array.from(event.target.files) as File[];
    this.archivos = [...this.archivos, ...nuevosArchivos];
  }

  eliminarArchivo(index: number) {
    this.archivos.splice(index, 1);
  }

  enviarFormulario(event: Event) {
    event.preventDefault();
    
    if (this.calificacion === 0) {
      alert('Por favor selecciona una calificación');
      return;
    }

    console.log('Comentario positivo:', this.comentarioPositivo);
    console.log('Comentario mejora:', this.comentarioMejora);
    console.log('Calificación:', this.calificacion);
    console.log('Archivos:', this.archivos);

    alert(`¡Gracias por tu calificación de ${this.calificacion} estrellas!`);
  }
}