import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  tvOutline, bookmarkOutline, checkmarkCircleOutline,
  timeOutline, statsChartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonIcon, IonLabel
  ]
})
export class ProfilePage implements OnInit {

  stats = {
    total: 0,
    watching: 0,
    planned: 0,
    completed: 0,
    episodesWatched: 0
  };

  constructor(private storageService: StorageService) {
    addIcons({
      tvOutline, bookmarkOutline, checkmarkCircleOutline,
      timeOutline, statsChartOutline
    });
  }

  ngOnInit() {
    this.loadStats();
  }

  ionViewWillEnter() {
    this.loadStats();
  }

  async loadStats() {
    this.stats = await this.storageService.getStats();
  }
}