
const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export function getBaseAPIURL() {
  return isDevelopment ?
  process.env.REACT_APP_LOCAL_ENDPOINT : process.env.REACT_APP_ENDPOINT;
}

export default {getBaseAPIURL};
