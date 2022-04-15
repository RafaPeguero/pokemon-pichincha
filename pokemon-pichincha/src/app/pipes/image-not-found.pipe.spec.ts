import { pipe } from 'rxjs';
import { ImageNotFoundPipe } from './image-not-found.pipe';

describe('ImageNotFoundPipe', () => {
  const pipe = new ImageNotFoundPipe();

  it('create an instance', () => {
    const pipe = new ImageNotFoundPipe();
    expect(pipe).toBeTruthy();
  });

  it('shuld return a default image when value empty', () => {
    expect(pipe.transform('')).toBe('/assets/image-not-found.png');
  });
  it('shuld return the image when value is not empty', () => {
    expect(pipe.transform('https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png')).toBe('https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png');
  });
});
