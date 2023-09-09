import { createAutoAnimate } from '@formkit/auto-animate/solid';
import { shuffle } from '@rifandani/nxact-yutiriti';
import { useI18n } from '@shared/hooks/usei18n/usei18n.hook';
import { useNavigate } from '@solidjs/router';
import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';

const useHomeClock = () => {
  const navigate = useNavigate();
  const [t, { locale }] = useI18n();

  const [setParent] = createAutoAnimate();
  const [showClock, setShowClock] = createSignal(true);
  const [seconds, setSeconds] = createSignal(0);

  const toggleClock = () => setShowClock((prev) => !prev);
  const [buttons, setButtons] = createStore([
    {
      id: 'sort' as const,
      class: 'btn-neutral btn',
      text: 'sortButtons' as const,
    },
    {
      id: 'clock' as const,
      class: 'btn-active btn',
      text: 'toggleClock' as const,
    },
    {
      id: 'language' as const,
      class: 'btn-accent btn',
      text: 'changeLanguage' as const,
    },
    {
      id: 'start' as const,
      class: 'btn-secondary btn',
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

  const onClickMapper = (btnId: 'sort' | 'clock' | 'language' | 'start') => {
    const mapper: Record<typeof btnId, () => void> = {
      sort: () => setButtons((prev) => shuffle(prev)),
      clock: () => toggleClock(),
      language: () => locale(locale() === 'en' ? 'id' : 'en'),
      start: () => navigate('/todos'),
    };

    mapper[btnId]();
  };

  // The first execution of the effect function is not immediate; it's scheduled to run after the current rendering phase
  createEffect(() => {
    let id: ReturnType<typeof setInterval>;

    if (showClock()) {
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
    showClock,
    buttons,
    setButtons,
    setParent,
    onClickMapper,
  };
};

export default useHomeClock;
