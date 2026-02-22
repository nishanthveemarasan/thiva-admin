export const required = (str = null) => {
    return str ? str.trim().length > 0 : false
  }
  
  export const length = (config) => (value) => {
    let isValid = true
    if (config.min) {
      isValid = isValid && value.trim().length >= config.min
    }
    return isValid
  }
  
  export const email = (value) =>
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      value,
    )