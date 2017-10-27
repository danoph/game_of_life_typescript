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
      this.errors.last_name = [ "can't be blank" ];
    }

    if (!this.params.email.length) {
      this.errors.email = [ "can't be blank" ];
    }
    else{
      if(!this.isValidEmailAddress(this.params.email)){
        this.errors.email = [ "not a valid email address"];
      }
    }

    return Object.keys(this.errors).length === 0;
  }

  private isValidEmailAddress(email:string):boolean{
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

}
