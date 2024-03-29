import Header from '../components/Login/Header';
import Button from '../components/commons/Button';
import InputWithLabel from '../components/Input/InputWithLabel';
import InputPassword from '../components/Input/InputPassword';
import InputWithCheckButton from '../components/Input/InputWithCheckButton';

import { useMemo } from 'react';
import InputWithVerifyCode from '../components/Input/InputWithVerifyCode';
import { useNavigate } from 'react-router-dom';
import usePassword from '../hooks/usePassword';
import useEmail from '../hooks/useEmail';

export default function Signup() {
  const navigate = useNavigate();

  const {
    email,
    setEmail,
    isLoading,
    setIsLoading,
    verificationCode,
    setVerificationCode,
    isAvailableEmailInput,
    isVerificationVisible,
    isEmailCertificated,
    emailValidationMessage,
    handleExpire,
    handleSendValidationCode,
    handleCheckValidationCode,
  } = useEmail();

  const {
    password,
    setPassword,
    checkPassword,
    setCheckPassword,
    passwordValidationMessage,
    checkPasswordValidationMessage,
  } = usePassword();

  const isSignUpAvailable = useMemo(() => {
    return isEmailCertificated && passwordValidationMessage === '' && checkPasswordValidationMessage === '';
  }, [isEmailCertificated, passwordValidationMessage, checkPasswordValidationMessage]);

  const handleSignUp = async () => {
    navigate('/setup', { state: { email, password, type: 'email' } });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Header />
      <div className="w-mobile p-6 flex flex-col mt-header overflow-y-hidden">
        <div className="h-20">
          <h2 className="self-start text-xl font-bold mb-3">회원가입</h2>
          <p className="text-s mb-5">반가워요! 가입을 위해 몇 가지만 확인할게요.</p>
        </div>
        <div className="[&>:not(:first-child)]:mt-5 flex-1 overflow-y-auto overflow-x-hidden">
          <InputWithLabel
            labelText={'이메일'}
            InputComponent={
              <InputWithCheckButton
                value={email}
                inputType={'email'}
                name={'email'}
                placeholder={'이메일 주소 입력'}
                onChangeFunc={setEmail}
                buttonType={'default'}
                buttonChildren={'인증번호 전송'}
                isButtonDisabled={isLoading || emailValidationMessage !== '' || !isAvailableEmailInput}
                isInputDisabled={!isAvailableEmailInput}
                isValid={emailValidationMessage === ''}
                onClick={() => {
                  setIsLoading(true);
                  handleSendValidationCode({ type: 'signup' });
                }}
              />
            }
            validateMessage={emailValidationMessage}
          />
          {isVerificationVisible && (
            <div>
              <InputWithVerifyCode
                time={300}
                value={verificationCode}
                onChangeFunc={setVerificationCode}
                onExpire={handleExpire}
              />
              <Button onClick={handleCheckValidationCode}>인증번호 확인</Button>
            </div>
          )}
          <InputWithLabel
            labelText={'비밀번호'}
            InputComponent={
              <InputPassword
                value={password}
                name={'password'}
                onChangeFunc={setPassword}
                placeholder={'비밀번호 입력'}
                isValid={passwordValidationMessage === ''}
              />
            }
            validateMessage={passwordValidationMessage === '' ? '' : `필수 조건: ${passwordValidationMessage}`}
          />
          <InputWithLabel
            labelText={'비밀번호 확인'}
            InputComponent={
              <InputPassword
                value={checkPassword}
                name={'check-password'}
                onChangeFunc={setCheckPassword}
                placeholder={'비밀번호 재입력'}
                isValid={checkPasswordValidationMessage === '' && checkPassword !== ''}
              />
            }
            validateMessage={checkPasswordValidationMessage}
          />
        </div>
        <div className="h-20 flex items-center">
          <Button type={'primary'} size={'large'} text={'bold'} isDisabled={!isSignUpAvailable} onClick={handleSignUp}>
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
