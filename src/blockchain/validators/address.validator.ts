import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'addressWallet', async: false })
export class AddressValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (text === null || text === undefined) {
      return false;
    }
    return text.length == 42;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Invalid format address!';
  }
}
