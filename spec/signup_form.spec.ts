import { SignupForm } from '../src/signup_form';
import { EnglishErrorStatmentsLibrary } from '../src/statement_libraries/EnglishErrorStatmentsLibrary';

// Requirements:
// - all fields must be sent, not empty string
// - email must be valid email
// - password must be valid password and match complexity requirements
    // Each requirement is independent and any violations should be listed.
        // e.g.  A password that is too short and doesn't contain a required character should
        // return 2 errors.
    // must be at least 8 characters
    // must include at least 1 uppercase letter
    // must include at least 1 lowercase letter
    // must include at least 1 special character from list: !@#$%^&*()
    // must include at least 1 number
// - password confirmation must match password field

describe('SignupForm', () => {
  let subject;
  let params;
  let stmts = new EnglishErrorStatmentsLibrary();

  describe('all params sent', () => {
    beforeEach(() => {
      // use a constant to ensure a different password for confirm cannot be used
      const password = 'Password123!';

      params = {
        first_name: 'Daniel',
        last_name: 'Errante',
        email: 'test@example.com',
        password: password,
        password_confirmation: password
      }

      subject = new SignupForm(params, stmts);
    });

    it('is valid', () => {
      expect(subject.isValid()).toEqual(true);
      expect(subject.errors).toEqual({});
    });

    describe('first name is empty string', () => {
      beforeEach(() => {
        params.first_name = '';
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.first_name).toEqual(["can't be blank"])
      });
    });

    describe('last name is empty string', () => {
      beforeEach(() => {
        params.last_name = '';
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.last_name).toEqual(["can't be blank"])
      });
    });

    describe('email is blank', () => {
      beforeEach(() => {
        params.email = '';
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.email).toEqual(["can't be blank"])
      });
    });

    describe('email is not a valid email', () => {
      beforeEach(() => {
        params.email = 'invalidemail';
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.email).toEqual(["not a valid email address"])
      });
    });

    describe('email is not a valid email 2', () => {
      beforeEach(() => {
        params.email = 'invalidemail.com';
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.email).toEqual(["not a valid email address"])
      });
    });

    describe('password does not match password confirmation', () => {
      beforeEach(() => {
        params.password_confirmation = 'password1234';
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.password).toEqual(["does not match"])
        expect(Object.keys(subject.errors).length).toEqual(1);
      });
    });

    describe('password is too short', () => {
      beforeEach(() => {
        params.password = 'Pw12#';
        params.password_confirmation = 'Pw12#';
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.password).toEqual(["too short"])
        expect(Object.keys(subject.errors).length).toEqual(1);
      });

      describe('password does not contain uppercase letter and is too short', () => {
        beforeEach(() => {
          params.password = 'pw123!';
          params.password_confirmation = 'pw123!';
          subject = new SignupForm(params, stmts);
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
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.password).toEqual(["doesn't contain an uppercase letter"])
        expect(Object.keys(subject.errors).length).toEqual(1);
      });
    });

    describe('password does not contain lowercase letter', () => {
      beforeEach(() => {
        params.password = 'PASSWORD123!';
        params.password_confirmation = 'PASSWORD123!';
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.password).toEqual(["doesn't contain a lowercase letter"])
        expect(Object.keys(subject.errors).length).toEqual(1);
      });
    });
    describe('password does not contain special character', () => {
      beforeEach(() => {
        params.password = 'Password123';
        params.password_confirmation = 'Password123';
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.password).toEqual(["doesn't contain a special character"])
        expect(Object.keys(subject.errors).length).toEqual(1);
      });
    });

    describe('password does not contain number', () => {
      beforeEach(() => {
        params.password = 'Password!';
        params.password_confirmation = 'Password!';
        subject = new SignupForm(params, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.errors.password).toEqual(["doesn't contain a number"])
        expect(Object.keys(subject.errors).length).toEqual(1);
      });
    });


  });
});
