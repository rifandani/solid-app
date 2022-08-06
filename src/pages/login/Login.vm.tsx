import { Navigator, useNavigate } from '@solidjs/router';
import { batch, createSignal, onMount } from 'solid-js';
import { setAppStore } from '../../app/AppStore';
import { User } from '../../models/User.model';
import { axiosInstance } from '../../services/http';
import { FormOnSubmitEvent, InputOnKeyUp } from '../../types';

// #region LOGIN FORM
export const [loginForm, setLoginForm] = createSignal({
  email: '',
  password: '',
});
export const [loginFormErrors, setLoginFormErrors] = createSignal('');

export const onKeyUpEmail: InputOnKeyUp = (ev) => {
  setLoginForm((prev) => ({
    ...prev,
    email: ev.currentTarget.value,
  }));
};

export const onKeyUpPassword: InputOnKeyUp = (ev) => {
  setLoginForm((prev) => ({
    ...prev,
    password: ev.currentTarget.value,
  }));
};

export const onSubmitForm =
  (navigate: Navigator) => async (ev: FormOnSubmitEvent) => {
    ev.preventDefault();

    // get all users
    const resp = await axiosInstance.get(`/users`);
    const users = resp.data as User[];

    // find specific user
    const user = users.find((_user) => _user.email === loginForm().email);

    // check if registered
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setAppStore('user', user);
      navigate('/todos');
    } else {
      batch(() => {
        setLoginForm({
          email: '',
          password: '',
        });
        setLoginFormErrors('User not found!');
      });
    }
  };
// #endregion

export const useLoginPageVM = () => {
  const navigate = useNavigate();

  onMount(() => {
    const user = localStorage.getItem('user');
    if (user) navigate('/todos');
  });

  return { navigate };
};
