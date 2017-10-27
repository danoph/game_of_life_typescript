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

  isValid(): boolean {

    if (!this.params.first_name.length) {
      this.errors.first_name = [ "can't be blank" ];
    }

    if (!this.params.last_name.length) {
      this.errors.last_name = [ "can't be blank"];
    }

    return Object.keys(this.errors).length === 0;
  }
}
