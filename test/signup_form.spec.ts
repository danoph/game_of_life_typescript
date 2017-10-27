import { SignupForm } from '../src/signup_form';

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

    //describe('first name is empty string', () => {
      //beforeEach(() => {
        //params = {
          //first_name: '',
          //last_name: 'Errante',
          //email: 'test@example.com',
          //password: 'password123',
          //password_confirmation: 'password123'
        //}

        //subject = new SignupForm(params);
      //});

      //it('is not valid', () => {
        //expect(subject.isValid()).toEqual(false);
        //expect(subject.errors.first_name).toEqual(["can't be blank"])
      //});
    //});
  });
});
