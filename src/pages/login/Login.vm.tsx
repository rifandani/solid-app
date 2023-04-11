import { useNavigate } from '@solidjs/router';
import { createMutation } from '@tanstack/solid-query';
import { createSignal } from 'solid-js';
import { ApiSuccessResponse } from '../../constants/types.constant';
import { useAppStorage } from '../../hooks/common/useAppStorage/useAppStorage.hook';
import useAuth from '../../hooks/common/useAuth/useAuth.hook';
import { ApiErrorResponse } from '../../models/Api.model';
import { Login, Token } from '../../models/Auth.model';
import { UserStorageSchema } from '../../models/User.model';
import { login } from '../../services/api/auth';
import { FormOnSubmit, InputOnKeyUp } from '../../types';

const formInitialValue: Login = {
  email: '',
  password: '',
};

const useForm = () => {
  const navigate = useNavigate();
  const [, setApp] = useAppStorage();
  const [form, setForm] = createSignal(formInitialValue);

  const loginMutation = createMutation({
    mutationFn: () => login(form()),
    onSuccess: (resp) => {
      if (!resp.ok) {
        throw new Error((resp as ApiErrorResponse).error.code);
      } else {
        // set user data to local storage and global store
        const user: UserStorageSchema = {
          email: form().email,
          token: (resp as ApiSuccessResponse<Token>).login.token,
        };

        setApp('user', user);
        navigate('/');
      }
    },
    onError: () => {
      setForm(formInitialValue);
    },
  });

  const onKeyUpEmail: InputOnKeyUp = (ev) => {
    setForm((prev) => ({
      ...prev,
      email: ev.currentTarget.value,
    }));
  };

  const onKeyUpPassword: InputOnKeyUp = (ev) => {
    setForm((prev) => ({
      ...prev,
      password: ev.currentTarget.value,
    }));
  };

  const onSubmitForm: FormOnSubmit = (ev) => {
    ev.preventDefault();
    loginMutation.mutate();
  };

  return { form, loginMutation, onKeyUpEmail, onKeyUpPassword, onSubmitForm };
};

const useLoginPageVM = () => {
  useAuth();

  const form = useForm();

  return { form };
};

export default useLoginPageVM;
