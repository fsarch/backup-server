import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { CronTime } from 'cron';

export function IsCronExpression(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCronExpression',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          try {
            const res = (CronTime as any).validateCronExpression(value);
            return res && res.valid === true;
          } catch (e) {
            return false;
          }
        },
        defaultMessage(_args: ValidationArguments) {
          return 'Invalid cron expression';
        },
      },
    });
  };
}

