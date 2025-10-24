import { Component } from '@angular/core';
import { RestaurantRegisterForm } from '../../components/restaurant-register-form/restaurant-register-form';

@Component({
  selector: 'app-restaurants-register',
  imports: [RestaurantRegisterForm],
  templateUrl: './restaurants-register.html',
  styleUrls: ['./restaurants-register.css']
})
export class RestaurantsRegister {}
