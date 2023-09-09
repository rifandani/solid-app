import { createAutoAnimate } from '@formkit/auto-animate/solid';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import { useNavigate } from '@solidjs/router';

const useHomePageVM = () => {
  const navigate = useNavigate();
  const [t] = useI18n();
  // refer to this issues: https://github.com/formkit/auto-animate/issues/121
  const [setParent] = createAutoAnimate();

  return { navigate, t, setParent };
};

export default useHomePageVM;
