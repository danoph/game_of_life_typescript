interface ISignupFormParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface FormErrors {
  [key: string]: string[];
}

export class SignupForm {
  errors: FormErrors = {};
  AUTH_CONFIG = {
    MIN_PASSWORD_LENGTH: 8,
    PASSWORD_REGEX: {
      UPPERCASE: /[A-Z]+/,
      LOWERCASE: /[a-z]+/,
      SPECIAL: /[!@#$%^&*()]+/,
      NUMBER: /[0-9]+/
    },
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ERROR_STATEMENTS: {
      BLANK: "can't be blank",
      INVALID_EMAIL: "not a valid email address",
      PASSWORDS_DO_NOT_MATCH: "does not match",
      PASSWORD_TOO_SHORT:  "too short",
      PASSWORD_DOES_NOT_CONTAIN_UPPERCASE: "doesn't contain an uppercase letter",
      PASSWORD_DOES_NOT_CONTAIN_LOWERCASE: "doesn't contain a lowercase letter",
      PASSWORD_DOES_NOT_CONTAIN_SPECIAL_CHARACTER: "doesn't contain a special character",
      PASSWORD_DOES_NOT_CONTAIN_NUMBER: "doesn't contain a number"
    }
  };

  constructor(private params: ISignupFormParams) { }

  isValid(): boolean {

    if (!this.params.first_name.length) {
      this.errors.first_name = [this.AUTH_CONFIG.ERROR_STATEMENTS.BLANK];
    }

    if (!this.params.last_name.length) {
      this.errors.last_name = [this.AUTH_CONFIG.ERROR_STATEMENTS.BLANK];
    }

    if (!this.params.email.length) {
      this.errors.email = [this.AUTH_CONFIG.ERROR_STATEMENTS.BLANK];
    }
    else if (!this.isValidEmailAddress(this.params.email)) {
      this.errors.email = [this.AUTH_CONFIG.ERROR_STATEMENTS.INVALID_EMAIL];
    }

    this.validatePassword();

    return Object.keys(this.errors).length === 0;
  }

  private validatePassword() {
    if (this.params.password !== this.params.password_confirmation) {
      this.pushPasswordError(this.AUTH_CONFIG.ERROR_STATEMENTS.PASSWORDS_DO_NOT_MATCH)
    }
    else {
      if (this.params.password.length < this.AUTH_CONFIG.MIN_PASSWORD_LENGTH) {
        this.pushPasswordError(this.AUTH_CONFIG.ERROR_STATEMENTS.PASSWORD_TOO_SHORT);
      }

      if (!this.AUTH_CONFIG.PASSWORD_REGEX.UPPERCASE.test(this.params.password)) {
        this.pushPasswordError(this.AUTH_CONFIG.ERROR_STATEMENTS.PASSWORD_DOES_NOT_CONTAIN_UPPERCASE);
      }

      if (!this.AUTH_CONFIG.PASSWORD_REGEX.LOWERCASE.test(this.params.password)) {
        this.pushPasswordError(this.AUTH_CONFIG.ERROR_STATEMENTS.PASSWORD_DOES_NOT_CONTAIN_LOWERCASE);
      }

      if (!this.AUTH_CONFIG.PASSWORD_REGEX.SPECIAL.test(this.params.password)) {
        this.pushPasswordError(this.AUTH_CONFIG.ERROR_STATEMENTS.PASSWORD_DOES_NOT_CONTAIN_SPECIAL_CHARACTER);
      }
      
      if (!this.AUTH_CONFIG.PASSWORD_REGEX.NUMBER.test(this.params.password)) {
        this.pushPasswordError(this.AUTH_CONFIG.ERROR_STATEMENTS.PASSWORD_DOES_NOT_CONTAIN_NUMBER);
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
