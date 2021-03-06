function validation(params) {
  let checkUsername = {
    minLength: 4,
    maxLength: 8,
    pattern: /[^a-zA-Z\-]+/
  };
  let checkPassword = {
    minLength: 6,
    maxLength: 8,
    pattern: /[^a-zA-Z\-\+\!\@\#\*\&\^\%\~]+/
  };
  let errorMessages = {
    usernameEmpty: 'UserNameを入力してください',
    passwordEmpty: 'Passwordを入力してください',
    usernameIrregalLength: 'UserNameは' + checkUsername.minLength + '文字以上' + checkUsername.maxLength + '文字以下です',
    passwordIrregalLength: 'Passwordは' + checkPassword.minLength + '文字以上' + checkPassword.maxLength + '文字以下です',
    usernameIrregalChar: 'UserNameに使用できる文字は 英小文字、`-` です',
    passwordIrregalChar: 'Passwordに使用できる文字は 英大小文字、`-`、`+`、`!`、`@` です',
    passwordMissmatch: 'Passwordが一致していません'
  };


  let errorMessage = [];
  if (params.username.length === 0) {
    errorMessage.push(errorMessages.usernameEmpty);
  } else {
    if (params.username.length < checkUsername.minLength || checkUsername.maxLength < params.username.length) {
      errorMessage.push(errorMessages.usernameIrregalLength);
    }
    if (params.username.match(checkUsername.pattern)) {
      errorMessage.push(errorMessages.usernameIrregalChar);
    }
  }

  if (params.password.length === 0) {
    errorMessage.push(errorMessages.passwordEmpty);
  } else {
    if (params.password.length < checkPassword.minLength || checkPassword.maxLength < params.password.length) {
      errorMessage.push(errorMessages.passwordIrregalLength);
    }
    if (params.password.match(checkPassword.pattern)) {
      errorMessage.push(errorMessages.passwordIrregalChar);
    }
  }

  if (params.passwordConfirm && params.password !== params.passwordConfirm) {
    errorMessage.push(errorMessages.passwordMissmatch);
  }

  return errorMessage;
}

if (typeof module === 'object') {
  module.exports.validation = validation;
}
