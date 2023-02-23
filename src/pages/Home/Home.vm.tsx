import { useNavigate } from '@solidjs/router';
import { createMemo, createSignal, onCleanup } from 'solid-js';
import useTranslator from '../../hooks/useTranslator/useTranslator.hook';

// export const [seconds, setSeconds] = createSignal(0);
// export const minutes = createMemo(
//   (prev: number) => (seconds() > 0 && seconds() % 2 === 0 ? prev + 1 : prev),
//   0,
// );
// export const hours = createMemo(
//   (prev: number) => (minutes() > 0 && minutes() % 2 === 0 ? prev + 1 : prev),
//   0,
// );
// export const time = () => seconds().toFixed();

// setInterval(() => {
//   setSeconds((prev) => +(prev + 0.1).toFixed(2));
// }, 100);

const useClock = () => {
  // Crucial to automatic dependency tracking, calling the getter within a tracking scope causes the calling function to depend on this Signal, so that function will rerun if the Signal gets updated.
  const [seconds, setSeconds] = createSignal(0);
  const minutes = createMemo(
    (prev: number) => (seconds() > 0 && seconds() % 2 === 0 ? prev + 1 : prev),
    0,
  );
  const hours = createMemo(
    (prev: number) => (minutes() > 0 && minutes() % 2 === 0 ? prev + 1 : prev),
    0,
  );

  // wrap any computation with a function, and this function can be used in a tracking scope
  const time = () => seconds().toFixed();

  const id = setInterval(() => {
    setSeconds((prev) => +(prev + 0.1).toFixed(2));
  }, 100);

  onCleanup(() => {
    clearInterval(id);
  });

  return {
    seconds,
    minutes,
    hours,
    time,
  };
};

const useHomePageVM = () => {
  const translator = useTranslator();
  const navigate = useNavigate();

  const clock = useClock();

  return { translator, navigate, clock };
};

export default useHomePageVM;
