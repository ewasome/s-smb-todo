import { useState } from 'react'

const validate = (value, validatorList) => {
  const validationFailure = validatorList.find((validator) => {
    const { fc } = validator;

    return !fc(value)
  });

  return validationFailure;
}

export function useInputWithValidation(validators) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [validationFailureMsg, setValidationFailureMsg] = useState('');

  const onChange = (event) => {
    const { value } = event.target;
    const validatorList = [].concat(validators);
    const result = validate(value, validatorList);

    setValue(value);

    if (!result) {
      setIsValid(true);
      setValidationFailureMsg('');
      return;
    }

    setIsValid(false);
    setValidationFailureMsg(result.msg);
  };

  return [value, { valid: isValid, msg: validationFailureMsg }, onChange];
}

export default useInputWithValidation;
