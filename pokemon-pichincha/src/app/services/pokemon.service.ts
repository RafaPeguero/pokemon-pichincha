import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPokemon } from '../models/pokemon.model';
import { ApiUrls } from './apiUrls';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getAllPokemons() {
    return this.http.get(`${ApiUrls.getAllPokemons}`);
  };

  getPokemon(id: number) {
    return this.http.get(`${ApiUrls.getPokemon}/${id}`);
  }

  addPokemon(pokemon: IPokemon) {
    return this.http.post(`${ApiUrls.addPkemon}`, pokemon);
  }

  updatePokemon(pokemon: IPokemon) {
    debugger;
    return this.http.put(`${ApiUrls.updatePokemon}/${pokemon.id}`, pokemon);
  }
  
  deletePokemon(id: number) {
    return this.http.delete(`${ApiUrls.updatePokemon}/${id}`)
  }



}
