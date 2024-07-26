import { PluralTranslatePipe } from './plural-translate.pipe';

describe('PluralTranslatePipe', () => {
  let pipe: PluralTranslatePipe;

  beforeEach(() => {
    pipe = new PluralTranslatePipe();
  });

  it('should return "key.none" when number is 0', () => {
    expect(pipe.transform('key', 0)).toEqual('key.none');
  });

  it('should return "key.singular" when number is 1', () => {
    expect(pipe.transform('key', 1)).toEqual('key.singular');
  });

  it('should return "key.plural" when number is greater than 1', () => {
    expect(pipe.transform('key', 2)).toEqual('key.plural');
  });

  it('should return "key.plural" when number is negative', () => {
    expect(pipe.transform('key', -1)).toEqual('key.plural');
  });
});