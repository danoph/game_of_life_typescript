import { SignupForm } from '../src/signup_form';

// Requirements:
// - all fields must be sent, not empty string
// - email must be valid email
// - password must be valid password and match complexity requirements
// - password confirmation must match password field

describe('SignupForm', () => {
  let subject;
  let params;

  describe('all params sent', () => {
    beforeEach(() => {
      params = {
        first_name: 'Daniel',
        last_name: 'Errante',
        email: 'test@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      }

      subject = new SignupForm(params);
    });

    it('is valid', () => {
      expect(subject.isValid()).toEqual(true);
    });

    describe('first name is empty string', () => {
      beforeEach(() => {
        params = {
          first_name: '',
          last_name: 'Errante',
          email: 'test@example.com',
          password: 'password123',
          password_confirmation: 'password123'
        }

        subject = new SignupForm(params);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.first_name).toEqual(["can't be blank"])
      });
    });

    describe('last name is empty string', () => {
      beforeEach(() => {
        params = {
          first_name: 'Daniel',
          last_name: '',
          email: 'test@example.com',
          password: 'password123',
          password_confirmation: 'password123'
        }

        subject = new SignupForm(params);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.last_name).toEqual(["can't be blank"])
      });
    });
  });
});
