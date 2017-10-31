export interface IErrorStatmentLibrary{
    FIELD_BLANK: string;
    INVALID_EMAIL: string;
    PASSWORDS_DO_NOT_MATCH: string;
    PASSWORD_TOO_SHORT:  string;
    PASSWORD_DOES_NOT_CONTAIN_UPPERCASE: string;
    PASSWORD_DOES_NOT_CONTAIN_LOWERCASE: string;
    PASSWORD_DOES_NOT_CONTAIN_SPECIAL_CHARACTER: string;
    PASSWORD_DOES_NOT_CONTAIN_NUMBER:string;
  };

export class EnglishErrorStatmentsLibrary implements IErrorStatmentLibrary{

    public FIELD_BLANK = "can't be blank";
    public INVALID_EMAIL= "not a valid email address";
    public PASSWORDS_DO_NOT_MATCH= "does not match";
    public PASSWORD_TOO_SHORT=  "too short";
    public PASSWORD_DOES_NOT_CONTAIN_UPPERCASE= "doesn't contain an uppercase letter";
    public PASSWORD_DOES_NOT_CONTAIN_LOWERCASE= "doesn't contain a lowercase letter";
    public PASSWORD_DOES_NOT_CONTAIN_SPECIAL_CHARACTER= "doesn't contain a special character";
    public PASSWORD_DOES_NOT_CONTAIN_NUMBER= "doesn't contain a number";

}