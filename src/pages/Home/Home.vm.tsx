import { createAutoAnimate } from '@formkit/auto-animate/solid';
import { useNavigate } from '@solidjs/router';
import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js';
import useTranslator from '../../hooks/useTranslator/useTranslator.hook';

const useClock = () => {
  // Crucial to automatic dependency tracking, calling the getter within a tracking scope causes the calling function to depend on this Signal, so that function will rerun if the Signal gets updated.
  // toggle clock
  const [toggle, setToggle] = createSignal(true);

  // time
  const [seconds, setSeconds] = createSignal(0);
  const minutes = createMemo(
    (prev: number) => (seconds() > 0 ? (seconds() % 2 === 0 ? prev + 1 : prev) : 0),
    0,
  );
  const hours = createMemo(
    (prev: number) => (minutes() > 0 ? (minutes() % 2 === 0 ? prev + 1 : prev) : 0),
    0,
  );

  // The first execution of the effect function is not immediate; it's scheduled to run after the current rendering phase
  createEffect(() => {
    let id: NodeJS.Timer;

    // eslint-disable-next-line no-console
    console.log('🚀 ~ file: Home.vm.tsx:27 ~ createEffect ~ toggle():', toggle());

    if (toggle()) {
      id = setInterval(() => {
        setSeconds((prev) => +(prev + 0.1).toFixed(2));
      }, 100);
    } else {
      setSeconds(0);
    }

    onCleanup(() => {
      clearInterval(id);
    });
  });

  const toggleClock = () => setToggle((prev) => !prev);

  // eslint-disable-next-line no-console
  console.log('this should be displayed first, then the toggle() signal.');

  return {
    seconds,
    minutes,
    hours,
    toggle,
    toggleClock,
  };
};

const useHomePageVM = () => {
  const translator = useTranslator();
  const navigate = useNavigate();

  // refer to this issues: https://github.com/formkit/auto-animate/issues/121
  const [setParent] = createAutoAnimate();

  const clock = useClock();

  return { translator, navigate, setParent, clock };
};

export default useHomePageVM;
