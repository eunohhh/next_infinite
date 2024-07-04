const validateInputs = (inputs: string[]) => inputs.some((input) => /\s/.test(input));

export default validateInputs;