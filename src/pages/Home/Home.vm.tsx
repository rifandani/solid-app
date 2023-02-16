import { useNavigate } from '@solidjs/router';

export const useHomePageVM = () => {
  const navigate = useNavigate();

  return { navigate };
};
