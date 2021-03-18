export type UseStateWithValidationResult = [
  string | undefined,
  (value: string) => void,
  { valid: boolean | null; msg: string }
];
