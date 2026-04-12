import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, WatchlistEntry } from 'src/app/services/storage';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSegment, IonSegmentButton, IonLabel, IonCard,
  IonCardContent, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonBadge, IonButton, IonIcon,
  IonItemSliding, IonItem, IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { trashOutline, eyeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSegment, IonSegmentButton, IonLabel, IonCard,
    IonCardContent, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonBadge, IonButton, IonIcon,
    IonItemSliding, IonItem, IonItemOptions, IonItemOption
  ]
})
export class WatchlistPage implements OnInit {

  selectedSegment: string = 'watching';
  watchingList: WatchlistEntry[] = [];
  plannedList: WatchlistEntry[] = [];
  completedList: WatchlistEntry[] = [];
  displayedList: WatchlistEntry[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {
    addIcons({ trashOutline, eyeOutline });
  }

  ngOnInit() {
    this.loadWatchlist();
  }

  ionViewWillEnter() {
    this.loadWatchlist();
  }

  async loadWatchlist() {
    this.watchingList = await this.storageService.getByStatus('watching');
    this.plannedList = await this.storageService.getByStatus('planned');
    this.completedList = await this.storageService.getByStatus('completed');
    this.updateDisplayedList();
  }

  updateDisplayedList() {
    if (this.selectedSegment === 'watching') {
      this.displayedList = this.watchingList;
    } else if (this.selectedSegment === 'planned') {
      this.displayedList = this.plannedList;
    } else {
      this.displayedList = this.completedList;
    }
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
    this.updateDisplayedList();
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

  async removeAnime(malId: number) {
    await this.storageService.removeFromWatchlist(malId);
    await this.loadWatchlist();
  }
}