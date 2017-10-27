import { EmailValidator } from '../src/email_validator';

describe('EmailValidator', () => {
  let subject;
  let email;

  beforeEach(() => {
    email = 'danoph@gmail.com';
    subject = new EmailValidator(email);
  });

  //it('returns true', () => {
    //expect(subject.isValid()).toEqual(true);
  //});
});
