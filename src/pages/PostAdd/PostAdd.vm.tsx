import { useBeforeLeave, useNavigate } from '@solidjs/router';
import { batch, createSignal, onCleanup } from 'solid-js';
import { appStore } from '../../app/AppStore';
import { User } from '../../models/User.model';
import { axiosInstance } from '../../services/http';
import { FormOnSubmitEvent, InputOnKeyUp } from '../../types';

type UsePostAddFormParams = {
  navigate: ReturnType<typeof useNavigate>;
};

const usePostAddForm = ({ navigate }: UsePostAddFormParams) => {
  const [postForm, setPostForm] = createSignal({
    title: '',
    body: '',
  });
  const [postFormErrors, setPostFormErrors] = createSignal('');
  let timeoutId: NodeJS.Timeout;

  const onKeyUpPostForm: InputOnKeyUp = (ev) => {
    setPostForm((prev) => ({
      ...prev,
      [ev.currentTarget.name]: ev.currentTarget.value,
    }));
  };

  const onSubmitForm = async (ev: FormOnSubmitEvent) => {
    ev.preventDefault();

    // get user id
    const { id } = appStore.user as User;

    // add post
    const resp = await axiosInstance.post(`/posts`, {
      userId: id,
      title: postForm().title,
      body: postForm().body,
    });

    if (resp.status === 201) {
      // refetchPosts();
      setPostForm({
        title: '',
        body: '',
      });
      navigate('/posts');
      return;
    }

    batch(() => {
      setPostForm({
        title: '',
        body: '',
      });
      setPostFormErrors(resp.data);
    });
  };

  useBeforeLeave((e) => {
    if (!e.defaultPrevented && (postForm().body || postForm().title)) {
      // preventDefault to block immediately and prompt user async
      e.preventDefault();

      timeoutId = setTimeout(() => {
        if (window.confirm('Discard unsaved changes - are you sure?')) {
          // user wants to proceed anyway so retry with force=true
          e.retry(true);
        }
      }, 100);
    }
  });

  onCleanup(() => clearTimeout(timeoutId));

  return { postForm, postFormErrors, onKeyUpPostForm, onSubmitForm };
};

export const usePostAddPageVM = () => {
  const navigate = useNavigate();
  const postAddForm = usePostAddForm({ navigate });

  return { postAddForm };
};
