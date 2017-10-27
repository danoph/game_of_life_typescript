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

  constructor(private params: ISignupFormParams = {}) {}

  isValid() {
    if (this.params.first_name.length) {
      return true;
    } else {
      this.errors.first_name = [ "can't be blank" ];
      return false;
    }
  }
}
