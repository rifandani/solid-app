import { createAutoAnimate } from '@formkit/auto-animate/solid';
import { useNavigate } from '@solidjs/router';
import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js';
import { useI18n } from '../../../shared/hooks/usei18n/usei18n.hook';

const useHomeClock = () => {
  const navigate = useNavigate();
  const [t, { locale }] = useI18n();

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

  const toggleClock = () => setToggle((prev) => !prev);

  const [buttons, setButtons] = createSignal([
    {
      id: 'sort',
      class: 'btn-ghost btn',
      onClick: () => {},
      text: `${t('sortButtons')} 💫`,
    },
    {
      id: 'clock',
      class: 'btn-active btn',
      onClick: () => toggleClock(),
      text: `${t('toggleClock')} 🕰`,
    },
    {
      id: 'language',
      class: 'btn-accent btn',
      onClick: () => locale(locale() === 'en' ? 'id' : 'en'),
      text: `${t('changeLanguage')} ♻`,
    },
    {
      id: 'start',
      class: 'btn-secondary btn',
      onClick: () => navigate('/todos'),
      text: `${t('getStarted')} ✨`,
    },
  ]);

  const [setParent] = createAutoAnimate();

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
