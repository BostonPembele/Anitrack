import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private baseUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) {}

  getTopAnime(): Observable<any> {
    return this.http.get(`${this.baseUrl}/top/anime`);
  }

  searchAnime(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/anime?q=${query}&limit=20`);
  }

  getAnimeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/anime/${id}/full`);
  }

  getAnimeCharacters(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/anime/${id}/characters`);
  }

  getSeasonalAnime(): Observable<any> {
    return this.http.get(`${this.baseUrl}/seasons/now`);
  }
}