import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../services/serviceMarvel.component';

@Component({
  selector: 'detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  public format: string = '';
  public character: any[] = [];
  public comics: any[] = [];
  public filteredComics: any[] = [];

  constructor(private route: ActivatedRoute, private marvelService: MarvelService) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    const id = this.route.snapshot.paramMap.get('id');

    this.search(name).then(data => {
      this.character = data;
    });

    this.searchComics(id).then(data => {
      this.comics = data.sort((a: any, b: any) => {
        const dateA = new Date(a.dates.find((d: any) => d.type === "onsaleDate").date);
        const dateB = new Date(b.dates.find((d: any) => d.type === "onsaleDate").date);
        return dateB.getTime() - dateA.getTime();
      });
    });

  }

  filterComics(format: string) {
    if (format == "") {
      this.filteredComics = this.comics;

    } else {
      this.filteredComics = this.comics.filter(comic => comic.format === format);
    }
    
  }
  

  async search(name: any) {
    try {
      const data = await this.marvelService.searchCharactersByName(name).toPromise();
      return this.character = data['data'].results;
    } catch (error) {
      console.error(error);
    }
  }

  async searchComics(id: any) {
    try {
      const data = await this.marvelService.getComicsByCharacterId(id).toPromise();
      this.filteredComics = data['data'].results;
      return this.comics = data['data'].results;
    } catch (error) {
      console.error(error);
    }
  }


}
