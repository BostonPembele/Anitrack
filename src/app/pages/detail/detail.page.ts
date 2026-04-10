import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from 'src/app/services/anime';
import { StorageService, WatchlistEntry } from 'src/app/services/storage';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
  IonBadge, IonSpinner, IonIcon, IonSelect, IonSelectOption,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonBackButton, IonButtons, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, bookmark, bookmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
    IonBadge, IonSpinner, IonIcon, IonSelect, IonSelectOption,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonBackButton, IonButtons, IonLabel
  ]
})
export class DetailPage implements OnInit {

  anime: any = null;
  characters: any[] = [];
  isLoading: boolean = true;
  isInWatchlist: boolean = false;
  selectedStatus: 'watching' | 'planned' | 'completed' = 'planned';

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    private storageService: StorageService
  ) {
    addIcons({ star, bookmark, bookmarkOutline });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAnime(id);
  }

  loadAnime(id: number) {
    this.animeService.getAnimeById(id).subscribe({
      next: async (response) => {
        this.anime = response.data;
        this.isLoading = false;
        this.isInWatchlist = await this.storageService.isInWatchlist(id);
        this.loadCharacters(id);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadCharacters(id: number) {
    this.animeService.getAnimeCharacters(id).subscribe({
      next: (response) => {
        this.characters = response.data.slice(0, 6);
      },
      error: () => {}
    });
  }

  async toggleWatchlist() {
    if (this.isInWatchlist) {
      await this.storageService.removeFromWatchlist(this.anime.mal_id);
      this.isInWatchlist = false;
    } else {
      const entry: WatchlistEntry = {
        malId: this.anime.mal_id,
        title: this.anime.title,
        imageUrl: this.anime.images.jpg.large_image_url,
        score: this.anime.score,
        episodes: this.anime.episodes ?? 0,
        status: this.selectedStatus,
        userRating: 0
      };
      await this.storageService.addToWatchlist(entry);
      this.isInWatchlist = true;
    }
  }
}