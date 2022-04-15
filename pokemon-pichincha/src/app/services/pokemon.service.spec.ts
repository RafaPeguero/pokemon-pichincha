import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IPokemon } from '../models/pokemon.model';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;
  let mockAddPokemonParam : IPokemon = {
    id: 0,
    name: 'Luxray',
    image: '',
    attack: 90,
    defense: 50,
    type: 'fire',
    hp: 100,
    idAuthor: 1
  }
  let mockUpdatePokemonParam : IPokemon = {
    id: 20,
    name: 'Luxray',
    image: '',
    attack: 90,
    defense: 50,
    type: 'fire',
    hp: 100,
    idAuthor: 1
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers:[PokemonService]
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call the correct url when getAllPokemons is called' ,() => {
    service.getAllPokemons().subscribe();
    const req = httpTestingController.expectOne('https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1');
    httpTestingController.verify();
    expect(req.request.method).toBe('GET');
  });

  it('should call the correct url when getPokemon is called' ,() => {
    service.getPokemon(1).subscribe();
    const req = httpTestingController.expectOne('https://pokemon-pichincha.herokuapp.com/pokemons/1');
    httpTestingController.verify();
    expect(req.request.method).toBe('GET');
  });

  it('should call the correct url when addPokemon is called' ,() => {
    service.addPokemon(mockAddPokemonParam).subscribe();
    const req = httpTestingController.expectOne('https://pokemon-pichincha.herokuapp.com/pokemons/?dAuthor=1');
    httpTestingController.verify();
    expect(req.request.method).toBe('POST');
  });

  it('should call the correct url when updatePokemon is called' ,() => {
    service.updatePokemon(mockUpdatePokemonParam).subscribe();
    const req = httpTestingController.expectOne('https://pokemon-pichincha.herokuapp.com/pokemons/20');
    httpTestingController.verify();
    expect(req.request.method).toBe('PUT');
  });

  it('should call the correct url when deletePokemon is called' ,() => {
    service.deletePokemon(20).subscribe();
    const req = httpTestingController.expectOne('https://pokemon-pichincha.herokuapp.com/pokemons/20');
    httpTestingController.verify();
    expect(req.request.method).toBe('DELETE');
  });

});
