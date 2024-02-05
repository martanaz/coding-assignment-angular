import { EntityActivePipe } from './entity-active.pipe';

describe('EntityActivePipe', () => {
  it('create an instance', () => {
    const pipe = new EntityActivePipe();
    expect(pipe).toBeTruthy();
  });

  it('should format values', () => {
    const pipe = new EntityActivePipe();
    expect(pipe.transform(true)).toEqual('Active');
    expect(pipe.transform(false)).toEqual('Inactive');
  });
});
