import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface WatchlistEntry {
  malId: number;
  title: string;
  imageUrl: string;
  score: number;
  episodes: number;
  status: 'watching' | 'planned' | 'completed';
  userRating: number;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageReady = false;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    this.storageReady = true;
  }

  async addToWatchlist(entry: WatchlistEntry): Promise<void> {
    const watchlist = await this.getWatchlist();
    const exists = watchlist.findIndex(item => item.malId === entry.malId);
    if (exists >= 0) {
      watchlist[exists] = entry;
    } else {
      watchlist.push(entry);
    }
    await this.storage.set('watchlist', watchlist);
  }

  async getWatchlist(): Promise<WatchlistEntry[]> {
    const watchlist = await this.storage.get('watchlist');
    return watchlist || [];
  }

  async removeFromWatchlist(malId: number): Promise<void> {
    const watchlist = await this.getWatchlist();
    const updated = watchlist.filter(item => item.malId !== malId);
    await this.storage.set('watchlist', updated);
  }

  async getByStatus(status: 'watching' | 'planned' | 'completed'): Promise<WatchlistEntry[]> {
    const watchlist = await this.getWatchlist();
    return watchlist.filter(item => item.status === status);
  }

  async isInWatchlist(malId: number): Promise<boolean> {
    const watchlist = await this.getWatchlist();
    return watchlist.some(item => item.malId === malId);
  }

  async getStats(): Promise<any> {
    const watchlist = await this.getWatchlist();
    return {
      total: watchlist.length,
      watching: watchlist.filter(item => item.status === 'watching').length,
      planned: watchlist.filter(item => item.status === 'planned').length,
      completed: watchlist.filter(item => item.status === 'completed').length,
      episodesWatched: watchlist
        .filter(item => item.status === 'completed')
        .reduce((sum, item) => sum + item.episodes, 0)
    };
  }
}