import { useEffect, useState } from "react";

function BanCountdown({ banDuration }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!banDuration) return;

    const endTime = new Date(banDuration).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      let diff = Math.max(0, endTime - now); 

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [banDuration]);

  if (!banDuration) return null;

  return (
    <div className="flex gap-5 text-base-content">
      <div>
        <span className="countdown font-mono text-4xl">
          <span
            style={{ "--value": timeLeft.days }}
            aria-live="polite"
            aria-label={`${timeLeft.days} days`}
          >
            {timeLeft.days}
          </span>
        </span>
        days
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span
            style={{ "--value": timeLeft.hours }}
            aria-live="polite"
            aria-label={`${timeLeft.hours} hours`}
          >
            {timeLeft.hours}
          </span>
        </span>
        hours
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span
            style={{ "--value": timeLeft.minutes }}
            aria-live="polite"
            aria-label={`${timeLeft.minutes} minutes`}
          >
            {timeLeft.minutes}
          </span>
        </span>
        min
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span
            style={{ "--value": timeLeft.seconds }}
            aria-live="polite"
            aria-label={`${timeLeft.seconds} seconds`}
          >
            {timeLeft.seconds}
          </span>
        </span>
        sec
      </div>
    </div>
  );
}

export default BanCountdown;
