import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';
import { ImageNotFoundPipe } from 'src/app/pipes/image-not-found.pipe';
import { IPokemon } from 'src/app/models/pokemon.model';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let mockPokemonService = jasmine.createSpyObj('PokemonService', ['getAllPokemons', 'getPokemon', 'deletePokemon']);
  let mockAllPokemons: IPokemon[] = [
      {
        id: 6717,
        name: "Yanma",
        image: "",
        type: "fire",
        hp: 50,
        attack: 9,
        defense: 25,
        idAuthor: 1
    },
    {
        id: 6718,
        name: "Yanma2",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png",
        type: "fire",
        hp: 50,
        attack: 50,
        defense: 50,
        idAuthor: 1
    },
  ];
  let mockPokemon: IPokemon = {
    id: 6718,
    name: "Yanma2",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png",
    type: "fire",
    hp: 50,
    attack: 50,
    defense: 50,
    idAuthor: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: PokemonService, useValue: mockPokemonService}
      ],
      declarations: [ PokemonListComponent, ImageNotFoundPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockPokemonService.getAllPokemons.and.returnValue(of(mockAllPokemons));
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the Pokemon Form and call getAllPokemons when the pokemonForm component make a request', () => {

    mockPokemonService.getAllPokemons.and.returnValues(of(mockAllPokemons));

    component.childFinishedTask(true);

    expect(component.showPokemonForm).toBe(false);
    expect(mockPokemonService.getAllPokemons).toHaveBeenCalled();
  });

  it('should close the Pokemon Form when the pokemonForm get close', () => {

    component.childFinishedTask(false);

    expect(component.showPokemonForm).toBe(false);
  });

  it('should return a pokemon and show pokemon form', () => {
    mockPokemonService.getPokemon.and.returnValues(of(mockPokemon));

    component.getPokemon(6718);

    expect(component.pokemon).toBe(mockPokemon)
    expect(component.showPokemonForm).toBe(true);

  });

  it('should call getAllPokemons when a pokemon is deleted', () => {

    mockPokemonService.deletePokemon.and.returnValues(of(mockAllPokemons));

    component.deletePokemon(6718);

    expect( mockPokemonService.deletePokemon).toHaveBeenCalled();
  });

  it('Should return the pokemons that match with the text', fakeAsync(() => {
    component.allPokemons = mockAllPokemons;
    const searchTextField = component.searchForm.controls['searchText'];
    searchTextField.setValue('Yanma');

    component.searchPokemon();

    tick(800);

    expect(component.allPokemons.length).toBe(1);

  }));

  it('Should return call the getAllPokemons method when searchText is null', fakeAsync(() => {
    const searchTextField = component.searchForm.controls['searchText'];
    searchTextField.setValue('');
    
    const spyGetAllPokemons = spyOn(component, 'getAllPokemons');
    
    component.searchPokemon();
    tick(800);


    expect(spyGetAllPokemons).toHaveBeenCalled();
    expect(component.allPokemons).toBe(mockAllPokemons);

  }));


});
