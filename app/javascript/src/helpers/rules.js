const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/
);
const EMAIL_REGEX = new RegExp(
  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/
);

export default {
  required: (value) => !!value || "必須項目です",
  passwordMin: (v) =>
    (v && PASSWORD_REGEX.test(v)) ||
    "大文字・小文字の英数字8を含む8文字以上で入力してください",
  changePassword: (v) =>
    !v ||
    PASSWORD_REGEX.test(v) ||
    "大文字・小文字の英数字8を含む8文字以上で入力してください",
  number: (v) => !v || !isNaN(v) || "半角数字で入力してください",
  emailFormat: (v) =>
    (v && EMAIL_REGEX.test(v)) ||
    "メールアドレスの正しい形式で入力してください",
};
