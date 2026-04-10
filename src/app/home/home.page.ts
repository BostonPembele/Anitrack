import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnimeService } from '../services/anime';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol,
  IonSpinner, IonBadge
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol,
    IonSpinner, IonBadge
  ]
})
export class HomePage implements OnInit {

  topAnime: any[] = [];
  searchResults: any[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  isSearching: boolean = false;

  constructor(private animeService: AnimeService, private router: Router) {}

  ngOnInit() {
    this.loadTopAnime();
  }

  loadTopAnime() {
    this.isLoading = true;
    this.animeService.getTopAnime().subscribe({
      next: (response) => {
        this.topAnime = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearchChange(event: any) {
    const query = event.detail.value;
    if (query && query.length > 2) {
      this.isSearching = true;
      this.animeService.searchAnime(query).subscribe({
        next: (response) => {
          this.searchResults = response.data;
          this.isSearching = false;
        },
        error: () => {
          this.isSearching = false;
        }
      });
    } else {
      this.searchResults = [];
    }
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }
}