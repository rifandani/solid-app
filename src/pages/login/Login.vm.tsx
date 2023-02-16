import { useNavigate } from '@solidjs/router';
import { batch, createSignal, onMount } from 'solid-js';
import { setAppStore } from '../../app/AppStore';
import { User } from '../../models/User.model';
import { axiosInstance } from '../../services/http';
import { FormOnSubmitEvent, InputOnKeyUp } from '../../types';

type UseLoginFormParams = {
  navigate: ReturnType<typeof useNavigate>;
};

const useLoginForm = ({ navigate }: UseLoginFormParams) => {
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

    // get all users
    const resp = await axiosInstance.get(`/users`);
    const users = resp.data as User[];

    // find specific user
    const user = users.find((_user) => _user.email === form().email);

    // check if registered
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setAppStore('user', user);
      navigate('/todos');
    } else {
      batch(() => {
        setForm({
          email: '',
          password: '',
        });
        setFormErrors('User not found!');
      });
    }
  };

  return { form, formErrors, onKeyUpEmail, onKeyUpPassword, onSubmitForm };
};

export const useLoginPageVM = () => {
  const navigate = useNavigate();
  const loginForm = useLoginForm({ navigate });

  onMount(() => {
    const user = localStorage.getItem('user');
    if (user) navigate('/todos');
  });

  return { loginForm };
};
