import { Component, OnInit, inject } from '@angular/core';
import { ServiceUsers } from '../../services/user';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finish-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './finish-profile.html',
  styleUrl: './finish-profile.css'
})
export class FinishProfile implements OnInit {
  _userService = inject(ServiceUsers);
  userId: string | null = null;
  _router = inject(Router);
  selectedFile: File | null = null;

  userForm = new FormGroup({
    profilePicture: new FormControl('')
  })

  constructor(private route: ActivatedRoute) { }

    onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  handleSubmit(){
  if (!this.selectedFile) {
    Swal.fire({
      title:'Alerta',
      icon:'warning',
      text:'Porfavor selecciona una imagen antes de cargar'
    });
    return;
  }

  const formData = new FormData();
  formData.append('profilePicture', this.selectedFile);
  formData.append('profileComplete', 'true');
  
  this._userService.updateUsers(formData, this.userId).subscribe({
    next: (res: any) => {
      Swal.fire({
        icon:'success',
        title:'Exito',
        text: res.msg
      }).then(()=>{
        this._router.navigate(['/inicio']);
      }
      )
    },
    error: (err: any) => {
      Swal.fire({
        icon:'error',
        title:'Error',
        text: err.error.error
      })
    }
  });
}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
  }
}