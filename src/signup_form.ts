interface ISignupFormParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export class SignupForm {
  constructor(private params: ISignupFormParams = {}) {}

  isValid() {
    return true;
  }
}
