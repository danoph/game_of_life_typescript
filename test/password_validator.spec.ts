import { PasswordValidator } from '../src/password_validator';

// must include at least 1 uppercase letter
// must include at least 1 lowercase letter
// must include at least 1 special character (ex ‘%’)
// must include at least 1 number

describe('PasswordValidator', () => {
  let subject;
  let password;

  describe('valid password', () => {
    beforeEach(() => {
      password = 'Password123!';
      subject = new PasswordValidator(password);
    });

    it('returns true', () => {
      expect(subject.isValid()).toEqual(true);
    });
  });

  describe('without uppercase letter', () => {
    beforeEach(() => {
      password = 'password123!';
      subject = new PasswordValidator(password);
    });

    it('returns false', () => {
      expect(subject.isValid()).toEqual(false);
    });
  });

  describe('without lowercase letter', () => {
    beforeEach(() => {
      password = 'PASSWORD123!';
      subject = new PasswordValidator(password);
    });

    it('returns false', () => {
      expect(subject.isValid()).toEqual(false);
    });
  });

  //describe('without special characterj', () => {
    //beforeEach(() => {
      //password = 'Password123';
      //subject = new PasswordValidator(password);
    //});

    //it('returns false', () => {
      //expect(subject.isValid()).toEqual(false);
    //});
  //});
});
