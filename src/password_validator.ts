export class PasswordValidator {
  constructor(private password:string) {
  }

  isValid() {
    return !!(
      this.password.match(/[A-Z]+/) &&
      this.password.match(/[a-z]+/)
    );
  }
}
