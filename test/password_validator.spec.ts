import { PasswordValidator } from '../src/password_validator';

// must be at least 8 characters
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

  describe('without a number', () => {
    beforeEach(() => {
      password = 'Password!';
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

  describe('without special character', () => {
    beforeEach(() => {
      password = 'Password123';
      subject = new PasswordValidator(password);
    });

    it('returns false', () => {
      expect(subject.isValid()).toEqual(false);
    });
  });

  describe('less than 8 characters', () => {
    beforeEach(() => {
      password = 'P@ss1';
      subject = new PasswordValidator(password);
    });

    it('returns false', () => {
      expect(subject.isValid()).toEqual(false);
    });
  });
});
