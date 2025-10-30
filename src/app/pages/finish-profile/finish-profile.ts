import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { ServiceUsers } from '../../services/user';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-finish-profile',
  imports: [],
  templateUrl: './finish-profile.html',
  styleUrl: './finish-profile.css'
})
export class FinishProfile implements OnInit{
  _userService = inject(ServiceUsers);
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id'); 
    console.log(this.userId)
  }
}
