export interface Status {
  valid: boolean;
  message?: string;
  showError?: boolean;
}

type Rule = (value: string) => Status;

export const required: Rule = (value: string): Status => {
  const valid = Boolean(value);
  const message = valid ? undefined : "This field is required";

  return {
    valid,
    message,
    showError: true,
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
      showError: value.length > 0,
    };
  };
}

export function validate(value: string, rules: Rule[]): Status {
  for (let rule of rules) {
    const result = rule(value);

    if (!result.valid) {
      return result;
    }
  }

  return {
    valid: true,
  };
}
