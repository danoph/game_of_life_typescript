import { ResetPasswordForm } from '../src/reset_password_form';
import { PasswordValidationRules } from '../src/signup_form';
import { EnglishErrorStatmentsLibrary } from '../src/statement_libraries/EnglishErrorStatmentsLibrary';

// 11.6.17 - requirement #2: app needs a reset password form
// password must match original password in DB, provided by external class
// new password must meet all password requirements on signup form
//
// TODO additional requirement: ability to use custom error messages for certain errors

describe('ResetPasswordForm', () => {
  let subject;
  let userId;
  let params;
  let stmts = new EnglishErrorStatmentsLibrary();

  let existingPassword;
  let newPassword;
  let newPasswordConfirmation;

  let passwordValidationRules: PasswordValidationRules;

  beforeEach(() => {
    userId = 1;

    existingPassword = 'Password123!';
    newPassword = 'NewPassword123!';
    newPasswordConfirmation = 'NewPassword123!';

    params = {
      password: existingPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation
    }

    passwordValidationRules = new PasswordValidationRules({
      meetsMinLength: true,
      includesUpperChar: true,
      includesLowerChar: true,
      includesSpecialChar: true,
      includesNumber: true
    });

    subject = new ResetPasswordForm(userId, params, passwordValidationRules, stmts);
  });

  describe('user id existing password valid', () => {
    beforeEach(() => {
      userId = 1;
      existingPassword = 'Password123!';

      subject = new ResetPasswordForm(userId, params, passwordValidationRules, stmts);
    });

    it('is valid', () => {
      expect(subject.isValid()).toEqual(true);
      expect(subject.hasErrors()).toEqual(false);
    });

    describe('password does not match password confirmation', () => {
      beforeEach(() => {
        params.new_password_confirmation = 'password1234';
        subject = new ResetPasswordForm(userId, params, passwordValidationRules, stmts);
      });

      it('is not valid', () => {
        expect(subject.isValid()).toEqual(false);
        expect(subject.hasErrors()).toEqual(true);
        expect(subject.errors.password).toEqual(["does not match"])
      });
    });
  });

  describe('user id existing password are invalid', () => {
    beforeEach(() => {
      userId = 2;
      existingPassword = 'password';

      subject = new ResetPasswordForm(userId, params, passwordValidationRules, stmts);
    });

    it('is not valid', () => {
      expect(subject.isValid()).toEqual(false);
      expect(subject.hasErrors()).toEqual(true);
      expect(subject.errors.password).toContain("does not match existing password");
    });
  });
});
