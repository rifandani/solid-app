import { useBeforeLeave, useNavigate } from '@solidjs/router';
import { createMutation, useQueryClient } from '@tanstack/solid-query';
import { createSignal, onCleanup } from 'solid-js';
import { ApiErrorResponse } from '../../models/Api.model';
import { queryKeys } from '../../services/api';
import { addPost } from '../../services/api/posts';
import { FormOnSubmit, InputOnKeyUp } from '../../types';

const formInitialValue = {
  title: '',
  body: '',
};

const usePostAddForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [postForm, setPostForm] = createSignal(formInitialValue);
  let timeoutId: NodeJS.Timeout;

  const postAddMutation = createMutation({
    mutationFn: () => addPost(postForm()),
    onSuccess: async (resp) => {
      setPostForm(formInitialValue);

      if (!resp.ok) {
        throw new Error((resp as ApiErrorResponse).error.code);
      } else {
        // NOTE: the order of function call MATTERS
        navigate('/posts');
        await queryClient.invalidateQueries({ queryKey: queryKeys.posts.list.queryKey });
      }
    },
    onError: () => {
      setPostForm(formInitialValue);
    },
  });

  const onKeyUpPostForm: InputOnKeyUp = (ev) => {
    setPostForm((prev) => ({
      ...prev,
      [ev.currentTarget.name]: ev.currentTarget.value,
    }));
  };

  const onSubmitForm: FormOnSubmit = (ev) => {
    ev.preventDefault();
    postAddMutation.mutate();
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

  return { postForm, postAddMutation, onKeyUpPostForm, onSubmitForm };
};

const usePostAddPageVM = () => {
  const postAddForm = usePostAddForm();

  return { postAddForm };
};

export default usePostAddPageVM;
