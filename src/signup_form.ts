import {IErrorStatmentLibrary} from '../src/statement_libraries/EnglishErrorStatmentsLibrary';

interface ISignupFormParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

interface FormErrors {
  [key: string]: string[];
};

export class PasswordValidationRules {
  meetsMinLength: boolean;
  includesUpperChar: boolean;
  //includesLowerChar: boolean;
  //includesSpecialChar: boolean;
  //includesNumber: boolean;

  constructor(attrs: any = {}) {
    this.meetsMinLength = attrs.meetsMinLength;
    this.includesUpperChar = attrs.includesUpperChar;
    //this.includesLowerChar = attrs.includesLowerChar;
    //this.includesSpecialChar = attrs.includesSpecialChar;
    //this.includesNumber = attrs.includesNumber;
  }
}

export class SignupForm {
  errors: FormErrors = {};

  AUTH_CONFIG = {
    PASSWORD_MINIMUM_LENGTH: 8,
    PASSWORD_REGEX_UPPERCASE: /[A-Z]+/,
    PASSWORD_REGEX_LOWERCASE: /[a-z]+/,
    PASSWORD_REGEX_SPECIAL: /[!@#$%^&*()]+/,
    PASSWORD_REGEX_NUMBER: /[0-9]+/,
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  };

  constructor(
    private params: ISignupFormParams,
    private passwordValidationRules: PasswordValidationRules,
    private errorStatements: IErrorStatmentLibrary
  ) {}

  isValid(): boolean {

    if (!this.params.first_name.length) {
      this.errors.first_name = [this.errorStatements.FIELD_BLANK];
    }

    if (!this.params.last_name.length) {
      this.errors.last_name = [this.errorStatements.FIELD_BLANK];
    }

    if (!this.params.email.length) {
      this.errors.email = [this.errorStatements.FIELD_BLANK];
    }
    else if (!this.isValidEmailAddress(this.params.email)) {
      this.errors.email = [this.errorStatements.INVALID_EMAIL];
    }

    this.validatePassword();

    return Object.keys(this.errors).length === 0;
  }

  private validatePassword() {
    if (this.params.password !== this.params.password_confirmation) {
      this.pushPasswordError(this.errorStatements.PASSWORDS_DO_NOT_MATCH)
    }
    else {
      if (this.passwordValidationRules.meetsMinLength) {
        if (this.params.password.length < this.AUTH_CONFIG.PASSWORD_MINIMUM_LENGTH) {
          this.pushPasswordError(this.errorStatements.PASSWORD_TOO_SHORT);
        }
      }

      if (this.passwordValidationRules.includesUpperChar) {
        if (!this.AUTH_CONFIG.PASSWORD_REGEX_UPPERCASE.test(this.params.password)) {
          this.pushPasswordError(this.errorStatements.PASSWORD_DOES_NOT_CONTAIN_UPPERCASE);
        }
      }

      if (!this.AUTH_CONFIG.PASSWORD_REGEX_LOWERCASE.test(this.params.password)) {
        this.pushPasswordError(this.errorStatements.PASSWORD_DOES_NOT_CONTAIN_LOWERCASE);
      }

      if (!this.AUTH_CONFIG.PASSWORD_REGEX_SPECIAL.test(this.params.password)) {
        this.pushPasswordError(this.errorStatements.PASSWORD_DOES_NOT_CONTAIN_SPECIAL_CHARACTER);
      }

      if (!this.AUTH_CONFIG.PASSWORD_REGEX_NUMBER.test(this.params.password)) {
        this.pushPasswordError(this.errorStatements.PASSWORD_DOES_NOT_CONTAIN_NUMBER);
      }

    }
  }

  private pushPasswordError(errorMessage: string) {
    if (!this.errors.password) this.errors.password = [];

    this.errors.password.push(errorMessage);
  }

  private isValidEmailAddress(email: string): boolean {
    const emailRegex = this.AUTH_CONFIG.EMAIL_REGEX;
    return emailRegex.test(email);
  }
}
