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
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  };

  constructor(private params: ISignupFormParams) { }

  isValid(): boolean {

    if (!this.params.first_name.length) {
      this.errors.first_name = ["can't be blank"];
    }

    if (!this.params.last_name.length) {
      this.errors.last_name = ["can't be blank"];
    }

    if (!this.params.email.length) {
      this.errors.email = ["can't be blank"];
    }
    else if (!this.isValidEmailAddress(this.params.email)) {
      this.errors.email = ["not a valid email address"];
    }

    this.validatePassword();

    return Object.keys(this.errors).length === 0;
  }

  private validatePassword() {
    if (this.params.password !== this.params.password_confirmation) {
      this.pushPasswordError("does not match")
    }
    else {
      if (this.params.password.length < this.AUTH_CONFIG.MIN_PASSWORD_LENGTH) {
        this.pushPasswordError("too short");
      }

      if (!this.AUTH_CONFIG.PASSWORD_REGEX.UPPERCASE.test(this.params.password)) {
        this.pushPasswordError("doesn't contain an uppercase letter");
      }

      if (!this.AUTH_CONFIG.PASSWORD_REGEX.LOWERCASE.test(this.params.password)) {
        this.pushPasswordError("doesn't contain a lowercase letter");
      }

      if (!this.AUTH_CONFIG.PASSWORD_REGEX.SPECIAL.test(this.params.password)) {
        this.pushPasswordError("doesn't contain a special character");
      }
      
      if (!this.AUTH_CONFIG.PASSWORD_REGEX.NUMBER.test(this.params.password)) {
        this.pushPasswordError("doesn't contain a number");
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
