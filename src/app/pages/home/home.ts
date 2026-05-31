import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room';
import { RoomDto } from '../../dto/RoomDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [CommonModule],
  styleUrl: './home.scss'
})
export class HomeComponent {

  username = '';

  constructor(private router: Router, private roomService: RoomService) {}

  myRooms: RoomDto[] = [];
  publicRooms: RoomDto[] = [];

  loading = false;
  errorMessage = '';


  ngOnInit(): void {

    const userString = localStorage.getItem('user');

    if (userString) {

      const user = JSON.parse(userString);

      this.username = user.username;
    }
    this.loadRooms();
  }

  goToCreateRoom(): void {
    this.router.navigate(['/rooms/create']);
  }

  loadRooms(): void {
  this.loading = true;

  this.roomService.getMyRooms().subscribe({
    next: rooms => {
      this.myRooms = rooms;
      this.loadPublicRooms();
    },
    error: () => {
      this.errorMessage = 'Errore nel caricamento delle room';
      this.loading = false;
    }
  });
}

loadPublicRooms(): void {
  this.roomService.getPublicRooms().subscribe({
    next: rooms => {
      this.publicRooms = rooms;
      this.loading = false;
    },
    error: () => {
      this.errorMessage = 'Errore nel caricamento delle room pubbliche';
      this.loading = false;
    }
  });
}


}