interface InputValidator {
  msg: string;
  fn(inputState: string): boolean;
}
