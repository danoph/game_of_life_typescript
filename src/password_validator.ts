export class PasswordValidator {
  constructor(private password:string) {
  }

  isValid() {
    return !!(
      this.password.length >= 8 &&
      this.password.match(/[A-Z]+/) &&
      this.password.match(/[a-z]+/) &&
      this.password.match(/\d+/) &&
      this.password.match(/[●!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+/)
    );
  }
}
