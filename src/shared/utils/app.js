const CodeStatus = {
  success: ['Success', '1', 1],
  notFound: [7, '7'],
};

export const statusSuccess = code => CodeStatus.success.includes(code);

export const statusNotfound = code => CodeStatus.notFound.includes(code);
