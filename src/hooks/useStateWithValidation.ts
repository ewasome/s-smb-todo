import { useState } from "react";

import { InputValidator, UseStateWithValidationResult } from '../interfaces';

// validate inputs value
const validate = (value: string, validatorList: InputValidator[]) => {
  // run passed validator functions on value, return first failed validator
  return validatorList.find((validator) => {
    const { fn } = validator;

    return !fn(value);
  });
};

// reusable hook to store and validate inputs value
export function useStateWithValidation(
  validators: InputValidator[]
): UseStateWithValidationResult {
  // set input value and validation state
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationFailureMsg, setValidationFailureMsg] = useState("");

  const onChange = (value: string) => {
    // unify validator value as array
    const validatorList = ([] as InputValidator[]).concat(validators);
    // run validate function for new value and store its result
    const result = validate(value, validatorList);

    setValue(value);

    // validation failure handling
    if (!result) {
      setIsValid(true);
      setValidationFailureMsg("");
      return;
    }

    // validation success handling
    setIsValid(false);
    setValidationFailureMsg(result.msg);
  };

  // return current state and validation, return onChange handler
  return [value, onChange, { valid: isValid, msg: validationFailureMsg }];
}

export default useStateWithValidation;
