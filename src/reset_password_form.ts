interface IResetPasswordFormParams {
  password: string;
  new_password: string;
  new_password_confirmation: string;
}

interface IUserDBRecord {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

const USER_DATABASE: IUserDBRecord[] = [
  {
    id: 1,
    email: 'test@example.com',
    first_name: 'Daniel',
    last_name: 'Errante',
    password: 'Password123!'
  },
  {
    id: 2,
    email: 'user2@example.com',
    first_name: 'John',
    last_name: 'Smith',
    password: 'P@$$W0rd'
  }
]

class UserFinder {
  static findUserById(userId: number) {
    for (let record of USER_DATABASE) {
      if (record.id === userId) {
        return record;
      }
    }
  }
}

class UserPasswordVerifier {
  constructor(private userId: string, private password: string) {}

  isValid(): boolean {
    let user = UserFinder.findUserById(this.userId);
    return (user && user.password === this.password);
  }
}

export class ResetPasswordForm {
  errors: FormErrors = {};

  passwordVerifier: UserPasswordVerifier;

  constructor(
    private userId: number,
    private params: IResetPasswordFormParams,
    private passwordValidationRules: PasswordValidationRules,
    private errorStatements: IErrorStatmentLibrary
  ) {
    this.passwordVerifier = new UserPasswordVerifier(this.userId, params.password);
  }

  isValid(): boolean {
    const existingPasswordValid = this.passwordVerifier.isValid();

    if (existingPasswordValid) {
      return true;
    } else {
      this.addError('password', 'does not match existing password');
      return false;
    }
  }

  addError(fieldName: string, errorMessage: string) {
    this.errors[fieldName] = this.errors[fieldName] || [];
    this.errors[fieldName].push(errorMessage);
  }

  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }
}
