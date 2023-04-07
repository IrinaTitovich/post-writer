export interface Status {
  valid: boolean;
  message?: string;
}

type Rule = (value: string) => Status;

export const required: Rule = (value: string): Status => {
  const valid = Boolean(value);
  const message = valid ? undefined : "This field is required";

  return {
    valid,
    message,
  };
};

export function minmaxLength({ min, max }: { min: number; max: number }): Rule {
  return function (value: string): Status {
    const result = Boolean(value.length >= min && value.length <= max);
    const message = result
      ? undefined
      : `This field must be between ${min} and ${max} characters`;

    return {
      valid: result,
      message,
    };
  };
}

export function validate(value: string, rules: Rule[]): Status {
  for (const rule of rules) {
    const result = rule(value);

    if (!result.valid) {
      return result;
    }
  }

  return {
    valid: true,
  };
}
