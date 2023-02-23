import { useBeforeLeave, useNavigate } from '@solidjs/router';
import { batch, createSignal, onCleanup } from 'solid-js';
import { http } from '../../services/http';
import { FormOnSubmitEvent, InputOnKeyUp } from '../../types';

const usePostAddForm = () => {
  const navigate = useNavigate();
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

    // add post
    const resp = await http.post(`/posts`, {
      title: postForm().title,
      body: postForm().body,
    });

    if (resp.status === 201) {
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
        // eslint-disable-next-line no-alert
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

const usePostAddPageVM = () => {
  const postAddForm = usePostAddForm();

  return { postAddForm };
};

export default usePostAddPageVM;
