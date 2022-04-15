import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

import { PokemonFormComponent } from './pokemon-form.component';

describe('PokemonFormComponent', () => {
  let component: PokemonFormComponent;
  let fixture: ComponentFixture<PokemonFormComponent>;
  let mockPokemonService = jasmine.createSpyObj('PokemonService', ['addPokemon', 'updatePokemon']);
  let mockAddPokemon : IPokemon = {
    id: 0,
    name: 'Luxray',
    image: '',
    attack: 90,
    defense: 50,
    type: 'fire',
    hp: 100,
    idAuthor: 1
  };
  let mockUpdatePokemon : IPokemon = {
    id: 20,
    name: 'Luxray',
    image: '',
    attack: 90,
    defense: 50,
    type: 'fire',
    hp: 100,
    idAuthor: 1
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: PokemonService, useValue: mockPokemonService}
      ],
      declarations: [ PokemonFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the method checkInputPokemonChanges when ngOnChanges is called', () => {
    const spycheckInputPokemonChanges = spyOn<any>(component, 'checkInputPokemonChanges');

    component.ngOnChanges({
      pokemon: new SimpleChange(null, mockUpdatePokemon, true)
    });

    expect(spycheckInputPokemonChanges).toHaveBeenCalled();

  });

  it('should call setPokemonData when ngOnChanges detect a new pokemon' , () => {
    let intialPokemonValue : IPokemon = {
      id: 0,
      name: '',
      image: '',
      attack: 0,
      defense: 0,
      type: '',
      hp: 0,
      idAuthor: 0
    };
    const spySetPokemonData = spyOn<any>(component, 'setPokemonData');
    component.checkInputPokemonChanges({ pokemon: new SimpleChange(intialPokemonValue, mockUpdatePokemon, false)});

    expect(spySetPokemonData).toHaveBeenCalled();
  });

  it('should set the pokemon data to the form' , () => {
    component.setPokemonData(mockAddPokemon);

    expect(component.pokemonForm.controls['id'].value).toBe(mockAddPokemon.id);
    expect(component.pokemonForm.controls['name'].value).toBe(mockAddPokemon.name);
    expect(component.pokemonForm.controls['image'].value).toBe(mockAddPokemon.image);
    expect(component.pokemonForm.controls['attack'].value).toBe(mockAddPokemon.attack);
    expect(component.pokemonForm.controls['defense'].value).toBe(mockAddPokemon.defense);
    expect(component.pokemonForm.controls['type'].value).toBe(mockAddPokemon.type);
    expect(component.pokemonForm.controls['hp'].value).toBe(mockAddPokemon.hp);
    expect(component.pokemonForm.controls['idAuthor'].value).toBe(mockAddPokemon.idAuthor);

  });

  it('should emit a finished task when addPokemon is called' , () => {
    mockPokemonService.addPokemon.and.returnValue(of(mockAddPokemon));
    const spyFinishedTaskEvent = spyOn(component.finishedTask, 'emit');
    component.addPokemon(mockAddPokemon);
    
    expect(mockPokemonService.addPokemon).toHaveBeenCalled();
    expect(spyFinishedTaskEvent).toHaveBeenCalledWith(true);
  });

  it('should emit a finished task when addPokemon is called' , () => {
    mockPokemonService.updatePokemon.and.returnValue(of(mockUpdatePokemon));
    const spyFinishedTaskEvent = spyOn(component.finishedTask, 'emit');
    component.updatePokemon(mockUpdatePokemon);
    
    expect(mockPokemonService.updatePokemon).toHaveBeenCalled();
    expect(spyFinishedTaskEvent).toHaveBeenCalledWith(true);
  });

  it('should call the addPokemon method when pokemon.id is 0' , () => {

    const spyAddPokemon = spyOn(component, 'addPokemon');
    Object.keys(component.pokemonForm.controls).map( key => {
      component.pokemonForm.controls[key].setValue(mockAddPokemon[key as keyof IPokemon]);
    });

    component.addorEditPokemon();

    expect( spyAddPokemon).toHaveBeenCalled();
  });

  it('should call the addPokemon method when pokemon.id is 0' , () => {

    const spyUpdatePokemon = spyOn(component, 'updatePokemon');
    Object.keys(component.pokemonForm.controls).map( key => {
      component.pokemonForm.controls[key].setValue(mockUpdatePokemon[key as keyof IPokemon]);
    });

    component.addorEditPokemon();

    expect( spyUpdatePokemon).toHaveBeenCalled();
  });

  it('should mark pokemonForm control name as touched when form is invalid' , () => {

    Object.keys(component.pokemonForm.controls).map( key => {
      component.pokemonForm.controls[key].setValue(mockUpdatePokemon[key as keyof IPokemon]);
    });

    component.pokemonForm.controls['name'].setValue(null);

    component.addorEditPokemon();

    expect(component.pokemonForm.controls['name'].touched).toBe(true);
  });
});
