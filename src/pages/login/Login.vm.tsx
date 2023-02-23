import { useNavigate } from '@solidjs/router';
import { batch, createSignal, onMount } from 'solid-js';
import { setAppStore } from '../../app/Store.app';
import { ApiResponse } from '../../constants/types.constant';
import { http } from '../../services/http';
import { FormOnSubmitEvent, InputOnKeyUp } from '../../types';
import { isApiSuccessResponse } from '../../utils/helper/helper.util';

const useForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = createSignal({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = createSignal('');

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

  const onSubmitForm = async (ev: FormOnSubmitEvent) => {
    ev.preventDefault();

    // setup form request
    const reqData = { email: form().email, password: form().password };
    const resp = await http.post(`/auth/login`, reqData);
    const respData = resp.data as ApiResponse<{ token: string }>;

    if (isApiSuccessResponse(respData)) {
      // set user data to local storage and global store
      const user = { email: reqData.email, token: respData.token };
      localStorage.setItem('user', JSON.stringify(user));
      setAppStore('user', user);
      navigate('/');
    } else {
      // clear form & display errors
      batch(() => {
        setForm({
          email: '',
          password: '',
        });
        setFormErrors(respData.error.code);
      });
    }
  };

  return { form, formErrors, onKeyUpEmail, onKeyUpPassword, onSubmitForm };
};

const useLoginPageVM = () => {
  const navigate = useNavigate();
  const form = useForm();

  onMount(() => {
    // redirect already logged in user to home
    const user = localStorage.getItem('user');
    if (user) navigate('/');
  });

  return { form };
};

export default useLoginPageVM;
