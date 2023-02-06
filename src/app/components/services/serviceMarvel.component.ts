import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private API_KEY = '997aa824e63379a27c4be8aa5791b7bb';
  private API_LIMIT = 10;
  private API_BASE_URL = `https://gateway.marvel.com:443/v1/public/characters`;
  
  constructor(private http: HttpClient) { }

  searchCharactersByName(name: string) :Observable<any> {
    const url = `${this.API_BASE_URL}?name=${encodeURIComponent(name)}&limit=${this.API_LIMIT}&apikey=${this.API_KEY}`;
    return this.http.get<any>(url);
  }

  getComicsByCharacterId(characterId: number): Observable<any> {
    const url = `${this.API_BASE_URL}/${characterId}/comics?apikey=${this.API_KEY}`;
    return this.http.get<any>(url);
  }
}