import { createAutoAnimate } from '@formkit/auto-animate/solid';
import { shuffle } from '@rifandani/nxact-yutiriti';
import { useNavigate } from '@solidjs/router';
import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';

const useHomeClock = () => {
  const navigate = useNavigate();
  const [t, { locale }] = useI18n();

  const [setParent] = createAutoAnimate();
  const [toggle, setToggle] = createSignal(true);
  const [seconds, setSeconds] = createSignal(0);

  const toggleClock = () => setToggle((prev) => !prev);
  const [buttons, setButtons] = createStore([
    {
      id: 'sort',
      class: 'btn-ghost btn',
      onClick: () => setButtons((prev) => shuffle(prev)),
      text: 'sortButtons' as const,
    },
    {
      id: 'clock',
      class: 'btn-active btn',
      onClick: () => toggleClock(),
      text: 'toggleClock' as const,
    },
    {
      id: 'language',
      class: 'btn-accent btn',
      onClick: () => locale(locale() === 'en' ? 'id' : 'en'),
      text: 'changeLanguage' as const,
    },
    {
      id: 'start',
      class: 'btn-secondary btn',
      onClick: () => navigate('/todos'),
      text: 'getStarted' as const,
    },
  ]);

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

    if (toggle()) {
      // if the clock is shown, increment the seconds
      id = setInterval(() => {
        setSeconds((prev) => +(prev + 0.1).toFixed(2));
      }, 100);
    } else {
      // if the clock is NOT shown, reset the seconds
      setSeconds(0);
    }

    onCleanup(() => clearInterval(id));
  });

  return {
    t,
    seconds,
    minutes,
    hours,
    toggle,
    toggleClock,
    buttons,
    setButtons,
    setParent,
  };
};

export default useHomeClock;
