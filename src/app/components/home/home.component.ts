import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarvelService } from '../services/serviceMarvel.component';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public name: string = '';
  public valueFromLocalStorage: any = '';
  public characters: any[] = [];

  constructor(private marvelService: MarvelService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.valueFromLocalStorage = this.localStorageService.getItem('name');
    this.searchLocalStorage(this.valueFromLocalStorage)
  }

  onClick(data: any): void {
    this.router.navigate(['/detalles', data.name, data.id], { state: data });
  }

  search() {
    this.marvelService.searchCharactersByName(this.name)
      .subscribe(data => {
        this.characters = data['data'].results;
        this.localStorageService.setItem('name', this.name);
      });
  }

  searchLocalStorage(value: any) {
    this.marvelService.searchCharactersByName(value)
      .subscribe(data => {
        this.characters = data['data'].results;
      });
  }

}