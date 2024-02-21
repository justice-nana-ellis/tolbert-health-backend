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

