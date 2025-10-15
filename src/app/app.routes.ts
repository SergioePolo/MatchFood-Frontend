import { Routes } from '@angular/router';
import { AboutUs } from './pages/about-us/about-us';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { RateBooking } from './pages/rate-booking/rate-booking';
import { RestaurantProfile } from './pages/restaurant-profile/restaurant-profile';
import { RestaurantsRegister } from './pages/restaurants-register/restaurants-register';
import { UserProfile } from './pages/user-profile/user-profile';
import { UserRegister } from './pages/user-register/user-register';
import { Welcome } from './pages/welcome/welcome';

export const routes: Routes = [
    {path: '' , component: Welcome, title:'Bienvenido a Match'},
    {path: 'nosotros', component: AboutUs, title: 'Acerca de MatchFood'},
    {path: 'inicio', component: Home, title: 'Encuentra tu restaurante'},
    {path: 'inicio-de-sesion', component: Login, title: 'Inicia sesión'},
    {path: 'califica-tu-reserva', component: RateBooking, title: 'Califica tu última reserva'},
    {path: 'perfil-del-restaurante', component: RestaurantProfile, title: 'Perfil del restaurante'},
    {path: 'crear-restaurante', component: RestaurantsRegister, title: 'Crear tu restaurante'},
    {path: 'perfil-de-usuario', component: UserProfile, title: 'Perfil de usuario'},
    {path: 'crear-usuario', component: UserRegister, title: 'Crea tu usuario'},
    {path:'**' , component: NotFound, title: '404 - No encontramos la página'},
];
