export const required = (str = null) => {
  return str ? str.trim().length > 0 : false;
};

export const length = (config) => (value) => {
  let isValid = true;
  if (config.min) {
    isValid = isValid && value.trim().length >= config.min;
  }
  return isValid;
};

export const number = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export const range = (config) => (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;

  let isValid = true;
  if (config.min !== undefined) {
    isValid = isValid && num >= config.min;
  }
  if (config.max !== undefined) {
    isValid = isValid && num <= config.max;
  }
  return isValid;
};

export const email = (value) =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value
  );

export const image = (file) => {
  if (!file) {
    return false;
  }

  // Get file type
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    return false;
  }

  return true;
};
