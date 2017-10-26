import { Main } from '../src/main';

describe('Main', () => {
  let subject;

  beforeEach(() => {
    subject = new Main();
  });

  it('prints out hello world', () => {
    expect(subject.helloWorld()).toEqual(true);
  });
});
