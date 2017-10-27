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
        password: 'Password123!',
        password_confirmation: 'Password123!'
      }

      subject = new SignupForm(params);
    });

    it('is valid', () => {
      expect(subject.isValid()).toEqual(true);
      expect(subject.errors).toEqual({});
    });

    describe('first name is empty string', () => {
      beforeEach(() => {
        params.first_name = '';
        subject = new SignupForm(params);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.first_name).toEqual(["can't be blank"])
      });
    });

    describe('last name is empty string', () => {
      beforeEach(() => {
        params.last_name = '';
        subject = new SignupForm(params);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.last_name).toEqual(["can't be blank"])
      });
    });

    describe('email is blank', () => {
      beforeEach(() => {
        params.email = '';
        subject = new SignupForm(params);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.email).toEqual(["can't be blank"])
      });
    });

    describe('email is not a valid email', () => {
      beforeEach(() => {
        params.email = 'invalidemail';
        subject = new SignupForm(params);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.email).toEqual(["not a valid email address"])
      });
    });

    describe('password does not match password confirmation', () => {
      beforeEach(() => {
        params.password_confirmation = 'password1234';
        subject = new SignupForm(params);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.password).toEqual(["does not match"])
        expect(Object.keys(subject.errors).length).toEqual(1);
      });
    });


    // must be at least 8 characters
    // must include at least 1 uppercase letter
    // must include at least 1 lowercase letter
    // must include at least 1 special character (ex ‘%’)
    // must include at least 1 number

    describe('password is too short', () => {
      beforeEach(() => {
        params.password = 'Pw123';
        params.password_confirmation = 'Pw123';
        subject = new SignupForm(params);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.password).toEqual(["too short"])
        expect(Object.keys(subject.errors).length).toEqual(1);
      });

      describe('password does not contain uppercase letter', () => {
        beforeEach(() => {
          params.password = 'pw123!';
          params.password_confirmation = 'pw123!';
          subject = new SignupForm(params);
        });

        it('is not valid', () => {
          expect(subject.isValid()).toEqual(false);

          expect(subject.errors.password).toContain("too short");
          expect(subject.errors.password).toContain("doesn't contain an uppercase letter");
          expect(subject.errors.password.length).toEqual(2);

          expect(Object.keys(subject.errors).length).toEqual(1);
        });
      });
    });

    describe('password does not contain uppercase letter', () => {
      beforeEach(() => {
        params.password = 'password123!';
        params.password_confirmation = 'password123!';
        subject = new SignupForm(params);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.password).toEqual(["doesn't contain an uppercase letter"])
        expect(Object.keys(subject.errors).length).toEqual(1);
      });
    });
  });
});
