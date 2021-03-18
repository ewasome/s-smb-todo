import { useState } from "react";

const validate = (value: string, validatorList: InputValidator[]) => {
  return validatorList.find((validator) => {
    const { fn } = validator;

    return !fn(value);
  });
};

export function useStateWithValidation(
  validators: InputValidator[]
): UseStateWithValidationResult {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationFailureMsg, setValidationFailureMsg] = useState("");

  const onChange = (value: string) => {
    const validatorList = ([] as InputValidator[]).concat(validators);
    const result = validate(value, validatorList);

    setValue(value);

    if (!result) {
      setIsValid(true);
      setValidationFailureMsg("");
      return;
    }

    setIsValid(false);
    setValidationFailureMsg(result.msg);
  };

  return [value, onChange, { valid: isValid, msg: validationFailureMsg }];
}

export default useStateWithValidation;
