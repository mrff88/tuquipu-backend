const errorResponseHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  if (message) error.message = message || '';

  return error;
};

export default { errorResponseHandler };
