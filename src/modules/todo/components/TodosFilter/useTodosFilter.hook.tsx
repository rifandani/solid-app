import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import { SelectOnChange } from '@shared/types/form.type';
import { useSearchParams } from '@solidjs/router';
import { defaultLimit } from '@todo/constants/todos.constant';

export default function useTodosFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [t] = useI18n();

  const selectedOption = () => searchParams?.limit ?? defaultLimit;

  // #region HANDLERS
  const handleChangeLimit: SelectOnChange = ({ currentTarget }) => {
    // set to url params
    setSearchParams({ ...searchParams, limit: currentTarget.value });
  };
  // #endregion

  return { t, selectedOption, handleChangeLimit };
}
