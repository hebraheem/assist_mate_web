import { useEffect, useState } from 'react';

export default function usePullToRefresh(ref: React.RefObject<HTMLDivElement>, onTrigger: (...arg: any) => unknown) {
  const TRIGGER_THRESHOLD = 180;
  const SHOW_INDICATOR_THRESHOLD = 50;
  const [polling, setPolling] = useState(false);
  const [pullChangeDegree, setPullChangeDegree] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // attach the event listener
    el.addEventListener('touchstart', handleTouchStart);

    return () => {
      // let's not forget to cleanup
      el.removeEventListener('touchstart', handleTouchStart);
    };
  });

  function handleTouchStart(startEvent: TouchEvent) {
    const el = ref.current;
    if (!el) return;

    const initialY = startEvent.touches[0].clientY;

    el.addEventListener('touchmove', handleTouchMove);
    el.addEventListener('touchend', handleTouchEnd);

    function handleTouchMove(moveEvent: TouchEvent) {
      const el = ref.current;
      if (!el) return;

      // get the current Y position
      const currentY = moveEvent.touches[0].clientY;

      // get the difference
      const dy = currentY - initialY;

      if (dy < 0) return;

      if (dy > TRIGGER_THRESHOLD) {
        //
      } else if (dy > SHOW_INDICATOR_THRESHOLD) {
        setPolling(true);
      } else {
        setPolling(false);
      }
      setPullChangeDegree(dy);
      el.style.transform = `translateY(${appr(dy)}px)`;
    }

    async function handleTouchEnd(endEvent: TouchEvent) {
      const el = ref.current;
      if (!el) return;

      el.style.transform = 'translateY(0)';

      el.style.transition = 'transform 0.2s';

      // run the callback
      const y = endEvent.changedTouches[0].clientY;
      const dy = y - initialY;
      if (dy > TRIGGER_THRESHOLD) {
        await onTrigger();
        setPolling(false);
      }

      // listen for transition end event
      el.addEventListener('transitionend', onTransitionEnd);

      // cleanup
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    }
  }

  function onTransitionEnd() {
    const el = ref.current;
    if (!el) return;

    // remove transition
    el.style.transition = '';

    // cleanup
    el.removeEventListener('transitionend', onTransitionEnd);
  }

  const MAX = 128;
  const k = 0.4;
  function appr(x: number) {
    return MAX * (1 - Math.exp((-k * x) / MAX));
  }

  return { polling, pullChangeDegree };
}

export const PullIndicator = ({ pullChangeDegree }: { pullChangeDegree?: number }) => {
  return (
    <div className="refresh-icon p-2 rounded-full flex justify-center">
      <div className="w-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=""
          style={{ transform: `rotate(${pullChangeDegree}deg)` }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    </div>
  );
};
