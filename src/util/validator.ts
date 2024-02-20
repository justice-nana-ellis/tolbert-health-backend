import { validate, ValidationError } from 'class-validator';

export const getErrorMessages = async (project: any): Promise<string[]> => {
  const validationErrors: ValidationError[] = await validate(project, { skipMissingProperties: false });

  if (validationErrors.length > 0) {
    return validationErrors.flatMap((error) => {
      return error.constraints ? Object.values(error.constraints) : [];
    });
  }

  return [];
};

export const isValidPassword = (password: string): boolean =>{
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email) && email.split('@').length === 2;
}
