import { Auth } from '../src/auth';

describe('Auth', () => {
  let subject;

  beforeEach(() => {
    subject = new Auth();
  });
  
    describe('Invalid parameters to login()', ()=>{

      it('returns null when username and password are empty/null', () => {
        expect(subject.login(null, null)).toEqual(null);
      });
      
      
      
      it('returns null when username is NOT null and password is null', ()=>{
        expect(subject.login("test", null)).toEqual(null);
      });
      
      it('returns null when username is null and password is NOT null', ()=>{
        expect(subject.login(null, "test")).toEqual(null);
      });
      
      
      
      it('returns null when username is NOT null and password is blank', ()=>{
        expect(subject.login("test", "")).toEqual(null);
      });
      
      it('returns null when username is blank and password is NOT null', ()=>{
        expect(subject.login("", "test")).toEqual(null);
      });
      
    })
  
});