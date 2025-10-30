import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import illustration from './assets/illustration.png';

const PLAYLIST_URL = 'https://music.youtube.com/watch?v=0e7uplpFJdE&si=tQnilL9XyyiRI97B';

const pencilCursor =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='42' viewBox='0 0 42 42'%3E%3Cpath fill='%2350473f' d='M3.2 30.9 1 41l10.3-2.4L38.7 11c1.6-1.6 1.6-4.2 0-5.9L33 -0.6c-1.6-1.6-4.2-1.6-5.9 0L3.2 30.9Zm4.4 5.5-2.2.5.5-2.2 2.9 1.7-1.2.3Zm-1.2-4.1 22-22 5.3 5.3-22 22-5.3-5.3Zm26.2-23.6-5.3-5.3 2.2-2.2c.4-.4 1.1-.4 1.5 0l3.8 3.7c.4.4.4 1.1 0 1.5l-2.2 2.3Z'/%3E%3C/svg%3E";

const reasonEntries = [
  {
    title: 'you patched my cracked heart 💔',
    body: 'was kinda lost, kinda guarded, then you chose me anyway. still stunned, still grateful.',
  },
  {
    title: 'you actually care 💛',
    body: 'your random check-ins land like a warm hug. stress volume down, life volume up.',
  },
  {
    title: 'same frequency ✨',
    body: 'we sync fast. no posturing, no guessing. just click, then clarity.',
  },
  {
    title: 'book brain activated 📖',
    body: 'a reader? say less. it feels like co-op mode for our brains.',
  },
  {
    title: 'real change, not talk 🖋️',
    body: 'you picked the hard path and leveled up. respect. i’m proud of you, fr.',
  },
  {
    title: 'joy factory 🎉',
    body: 'you decorate days with cute chaos and stupid little smiles. i fold every time.',
  },
];


const receiptEntries = [
  {
    id: 'care-parcel',
    title: 'Care parcel drop',
    emoji: '📮',
    snippet: 'You labelled snacks with instructions so I actually rested.',
    body: 'You hand-delivered rest rules, taped reminders to drink water, and it felt like someone highlighted "pause here" across my week.',
  },
  {
    id: 'brain-melt',
    title: 'Singlish brain melt',
    emoji: '🧠',
    snippet: 'We misfired every word and laughed till it hurt.',
    body: 'Our Singlish glitch-out should have been awkward but we doubled down, added sound effects, and somehow made nonsense feel poetic.',
  },
  {
    id: 'green-light',
    title: 'Family green light',
    emoji: '🟢',
    snippet: 'Your family liked the chaos we come with.',
    body: 'You invited me into your world, and the kind smiles back felt like paper seals - approved, stamped, cherished.',
  },
  {
    id: 'playlist',
    title: 'Playlist reshuffle',
    emoji: '🎧',
    snippet: 'One song, big feelings, new shared soundtrack.',
    body: 'We built a playlist in real time, annotated it with emojis, and the bridge of track four still smells like your perfume.',
  },
  {
    id: 'fits-photobooth',
    title: 'Outfits & photobooths',
    emoji: '📸',
    snippet: "We pre-planned a photobooth we haven't taken yet.",
    body: 'You sketched future outfits, circled prop ideas, and I realised I could picture us on that strip forever.',
  },
  {
    id: 'notion-arc',
    title: 'Tiny notion steps',
    emoji: '📒',
    snippet: 'Habits, workouts, and gentle accountability.',
    body: 'We built a Notion page like it was a shared diary - workouts logged, wins stickered, patience highlighted in pastel.',
  },
];

const timelineEntries = [
  {
    label: 'first',
    emoji: '🌱',
    title: 'bumble match',
    body: 'unserious swipe turned serious fast. chaos speedrun unlocked.',
  },
  {
    label: 'second',
    emoji: '☕️',
    title: 'madiun meet up',
    body: 'unhinged fun, zero dead air, ten out of ten memories.',
  },
  {
    label: 'third',
    emoji: '🎧',
    title: 'family meet up',
    body: 'mini interview arc. somehow i cleared the final boss.',
  },
  {
    label: 'fourth',
    emoji: '🏡',
    title: 'you came to malang',
    body: 'new city, same spark. felt weirdly… comfortable.',
  },
  {
    label: 'fifth',
    emoji: '💍',
    title: 'the next thing',
    body: 'only one question left. spoilers: i already know your answer.',
  },
];

const galleryFiles = [
  'running.png',
  'reading.png',
  'gym.png',
  'rich.png',
  'hogwarts.png',
  'umamusume.png',
];

const futureCaptions = [
  'sunrise run route plotting 🏃‍♀️',
  'cozy cuddle book reads 📚',
  'future gym accountability 💪',
  'getting rich together 💼',
  'ravenclaw at hogwarts 🪄',
  'we in umamusume world 🐎',
];

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

const scribbleTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1],
};

const TornDivider = () => (
  <div className="relative my-8 flex items-center justify-center" aria-hidden>
    <svg className="h-6 w-full text-graphite/20" viewBox="0 0 160 24" fill="none">
      <path
        d="M0 12c12 0 24-12 36-12s24 12 36 12 24-12 36-12 24 12 36 12 24-12 36-12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="6 10"
      />
    </svg>
  </div>
);

function TapeStrip({ className }) {
  return (
    <span
      className={classNames(
        'pointer-events-none absolute left-1/2 top-0 z-10 w-28 -translate-x-1/2',
        className
      )}
      aria-hidden
    >
      <span className="block h-8 rotate-2 rounded-sm bg-tape/80 shadow-md backdrop-blur-[1px]" />
    </span>
  );
}

const scribbleShapes = {
  loop: {
    viewBox: '0 0 120 40',
    path: 'M4 26C18 12 36 8 54 18s32 12 50-6',
  },
  underline: {
    viewBox: '0 0 120 40',
    path: 'M6 22c16 12 38 14 60 4s36-12 48-4',
  },
  sparkle: {
    viewBox: '0 0 120 40',
    path: 'M60 6l-4 10-10 4 10 4 4 10 4-10 10-4-10-4-4-10Z',
    filled: true,
  },
};

function Scribble({ className, variant = 'loop', color = '#e9a9b2', strokeWidth = 3 }) {
  const shape = scribbleShapes[variant] ?? scribbleShapes.loop;

  return (
    <svg
      className={classNames('pointer-events-none select-none', className)}
      viewBox={shape.viewBox}
      fill="none"
      aria-hidden
    >
      <path
        d={shape.path}
        fill={shape.filled ? color : 'none'}
        stroke={shape.filled ? 'none' : color}
        strokeWidth={shape.filled ? 0 : strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function App() {
  const prefersReducedMotion = useReducedMotion();
  const [currentReason, setCurrentReason] = useState(0);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [answerLocked, setAnswerLocked] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [qrStampVisible, setQrStampVisible] = useState(false);

  const confettiRef = useRef(null);
  const audioContextRef = useRef(null);

  const playPaperFlip = useCallback(() => {
    if (typeof window === 'undefined') return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }
    const ctx = audioContextRef.current;

    const trigger = () => {
      const duration = 0.28;
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        const t = i / data.length;
        const envelope = Math.exp(-5.5 * t);
        const flutter = Math.sin(t * Math.PI * 3) * 0.3;
        data[i] = (Math.random() * 2 - 1) * envelope * 0.4 + flutter * envelope;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 800;
      filter.Q.value = 7;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.9, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      source.connect(filter).connect(gain).connect(ctx.destination);
      source.start();
    };

    if (ctx.state === 'suspended') {
      ctx
        .resume()
        .then(trigger)
        .catch(trigger);
    } else {
      trigger();
    }
  },
    []
  );

  const fireConfetti = useCallback(() => {
    if (prefersReducedMotion) return;
    const api = confettiRef.current;
    if (!api || typeof api.confetti !== 'function') return;
    const { confetti, shapes = {} } = api;
    const heart = shapes.heart;
    const star = shapes.star;
    const customShapes = [heart, star].filter(Boolean);
    const shared = {
      disableForReducedMotion: true,
      shapes: customShapes.length ? customShapes : undefined,
    };

    confetti({
      ...shared,
      particleCount: 140,
      spread: 75,
      startVelocity: 48,
      origin: { y: 0.7 },
      colors: ['#e9a9b2', '#f6f0e6', '#6f8b7c', '#1f1a16'],
      scalar: 0.9,
    });
    confetti({
      ...shared,
      particleCount: 70,
      angle: 120,
      spread: 65,
      origin: { x: 0.1, y: 0.45 },
      colors: ['#e9a9b2', '#f6f0e6'],
      scalar: 0.8,
      drift: 0.6,
      gravity: 0.9,
      ticks: 210,
    });
    confetti({
      ...shared,
      particleCount: 70,
      angle: 60,
      spread: 65,
      origin: { x: 0.9, y: 0.45 },
      colors: ['#6f8b7c', '#f6f0e6'],
      scalar: 0.8,
      drift: -0.6,
      gravity: 0.9,
      ticks: 210,
    });
  }, [prefersReducedMotion]);

  const galleryImages = useMemo(
    () =>
      galleryFiles.slice(0, 9).map((file, index) => ({
        src: new URL(`./assets/${file}`, import.meta.url).href,
        caption: futureCaptions[index] ?? `future moment #${index + 1}`,
      })),
    []
  );

  useEffect(() => {
    let mounted = true;
    import('canvas-confetti')
      .then((module) => {
        if (!mounted) return;
        const confetti = module.default;
        const heart = module.shapeFromPath
          ? module.shapeFromPath({
            path: 'M16 29s-13-7.6-13-17a8.5 8.5 0 0 1 15-5.7A8.5 8.5 0 0 1 33 12c0 9.4-13 17-13 17Z',
          })
          : undefined;
        const star = module.shapeFromPath
          ? module.shapeFromPath({
            path: 'M16 1l4.4 9.3 10.2 1.1-7.6 6.6 2.2 10-9.2-5.3-9.2 5.3 2.2-10L1.4 11.4l10.2-1.1L16 1Z',
          })
          : undefined;
        confettiRef.current = {
          confetti,
          shapes: {
            heart,
            star,
          },
        };
      })
      .catch(() => {
        confettiRef.current = null;
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('qr') === '1') {
      setQrStampVisible(true);
      const timeout = window.setTimeout(() => setQrStampVisible(false), 1000);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (activeReceipt || zoomedImage) {
          playPaperFlip();
        }
        setActiveReceipt(null);
        setZoomedImage(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeReceipt, zoomedImage, playPaperFlip]);

  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion) {
      root.style.setProperty('--page-shadow-shift', '0px');
      return undefined;
    }
    let frame = null;

    const update = () => {
      const progress = Math.min(window.scrollY / 1200, 1);
      root.style.setProperty('--page-shadow-shift', `${progress * 4}px`);
      frame = null;
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!toastVisible) return undefined;
    const timeout = window.setTimeout(() => setToastVisible(false), 2800);
    return () => window.clearTimeout(timeout);
  }, [toastVisible]);

  useEffect(
    () => () => {
      if (audioContextRef.current && typeof audioContextRef.current.close === 'function') {
        audioContextRef.current.close().catch(() => { });
      }
    },
    []
  );

  const goNextReason = () => {
    playPaperFlip();
    setCurrentReason((prev) => (prev + 1) % reasonEntries.length);
  };
  const goPrevReason = () => {
    playPaperFlip();
    setCurrentReason((prev) => (prev - 1 + reasonEntries.length) % reasonEntries.length);
  };

  const handleAnswer = () => {
    if (answerLocked) return;
    playPaperFlip();
    fireConfetti();
    setAnswerLocked(true);
    setToastVisible(true);
    window.setTimeout(() => {
      window.open(PLAYLIST_URL, '_blank', 'noopener,noreferrer');
    }, 2000);
  };

  const answerPromptKey = answerLocked ? 'locked' : 'prompt';
  const answerPromptText = answerLocked
    ? 'Already sealed with a yes — secret playlist en route.'
    : 'Pick your favorite flavor of yes.';

  return (
    <div className="relative min-h-screen pb-24">
      <header
        className="sticky top-0 z-40 w-full bg-[#f6f0e6]/80 px-5 py-4 backdrop-blur-md"
        style={{ cursor: `url(${pencilCursor}), auto` }}
      >
        <div className="mx-auto flex w-full max-w-5xl justify-center">
          <motion.div
            className="relative flex items-center gap-3 rounded-full border border-graphite/10 bg-white/85 px-6 py-3 shadow-sm"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.44, 0.36, 1] }}
          >
            <span className="font-hand text-xl text-ink sm:text-2xl">dear jessica 💌</span>
            <span className="hidden text-[11px] uppercase tracking-[0.3em] text-graphite/60 sm:block">
              special gift for you
            </span>
            <Scribble
              variant="underline"
              color="#e9a9b2"
              className="absolute -bottom-4 left-6 h-8 w-32 opacity-70"
            />
          </motion.div>
        </div>
      </header>

      <main className="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-16 px-5 sm:px-8">
        <motion.section
          className="relative notebook-margin deckled-card px-6 py-12 sm:px-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <TapeStrip />
          <Scribble
            variant="loop"
            color="#f4b7c6"
            className="absolute -top-8 right-6 hidden h-12 w-32 opacity-60 sm:block"
          />
          <div className="absolute -left-6 -top-8 hidden h-20 w-20 rotate-6 rounded-full border border-graphite/20 bg-white/70 text-center text-xs uppercase tracking-[0.27em] text-graphite/60 sm:grid place-items-center">
            copy<br />for Jessica
          </div>

          <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_260px] sm:items-center">
            <div>
              <motion.h1
                className="font-hand text-6xl leading-[1.08] text-ink sm:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.6 }}
              >
                dear jessica ✨
              </motion.h1>
              <div className="mt-3 h-6 w-32">
                <Scribble variant="underline" color="#f4b7c6" className="h-full w-full" />
              </div>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite">
                i've been wanting to say this properly.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-graphite/80">
                after watching you grow and choosing me back, here’s my little secret. read slow. this one matters
              </p>
            </div>
            <motion.figure
              className="relative mx-auto w-56 max-w-[260px] sm:mx-0 sm:w-64"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24, rotate: prefersReducedMotion ? 0 : 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span
                className="pointer-events-none absolute -inset-3 "
                aria-hidden
              />
              <img
                src={illustration}
                alt="Hand-drawn collage of us that sets the tone for the letter."
                className="relative z-10 w-full "
                loading="eager"
              />
              <Scribble
                variant="loop"
                color="#f4d9a6"
                className="pointer-events-none absolute -bottom-6 -right-6 h-10 w-28 opacity-70"
              />
            </motion.figure>
          </div>
        </motion.section>

        <section className="relative notebook-margin deckled-card px-6 py-10 sm:px-12">
          <motion.div
            className="absolute -right-4 top-6 h-16 w-16"
            initial={{ rotate: -12, opacity: 0 }}
            whileInView={{ rotate: -6, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            aria-hidden
          >
            <svg viewBox="0 0 64 64" className="h-full w-full text-graphite/40">
              <path
                d="M32 58s-6-8-16-12c-4-2-8-6-8-12 0-7 6-12 12-12 8 0 12 8 12 8s4-8 12-8c6 0 12 5 12 12 0 6-4 10-8 12-10 4-16 12-16 12Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M48 16c-4-8-12-14-16-14s-12 6-16 14"
                fill="none"
                stroke="currentColor"
                strokeDasharray="6 6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          <motion.p
            className="font-hand text-3xl text-ink [text-wrap:balance]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            I pour my thoughts into this page with my heart. Read it like a mini
            diary, okay?
          </motion.p>
          <Scribble variant="loop" color="#f4b7c6" className="mt-4 block h-8 w-32 opacity-70" />
        </section>

        <section className="notebook-margin">
          <div className="relative deckled-card px-6 py-10 sm:px-12">
            <TapeStrip className="-top-4" />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-sm">
                <h2 className="font-hand text-4xl text-ink">6 reasons why i actually love you</h2>

                <div className="mt-2 h-6 w-28">
                  <Scribble variant="underline" color="#f4b7c6" className="h-full w-full" />
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-graphite/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-graphite/60 shadow-sm">
                <button
                  type="button"
                  onClick={goPrevReason}
                  aria-label="Previous scribble"
                  className="rounded-full px-2 py-1 text-lg transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/40"
                >
                  ◀️
                </button>
                <span>
                  page {currentReason + 1} / {reasonEntries.length}
                </span>
                <button
                  type="button"
                  onClick={goNextReason}
                  aria-label="Next scribble"
                  className="rounded-full px-2 py-1 text-lg transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/40"
                >
                  ▶️
                </button>
              </div>
            </div>

            <div className="mt-10">
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentReason}
                  initial={{ opacity: 0, y: 30, rotate: prefersReducedMotion ? 0 : -2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -25, rotate: prefersReducedMotion ? 0 : 2 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative mx-auto max-w-xl rounded-[32px] border border-graphite/10 bg-[#fffdf8] p-8 shadow-lg"
                >
                  <TapeStrip className="-top-6" />
                  <Scribble
                    variant={currentReason % 2 === 0 ? 'loop' : 'underline'}
                    color="#f4d9a6"
                    className="pointer-events-none absolute -bottom-5 right-10 h-8 w-32 opacity-60"
                  />
                  <h3 className="font-hand text-3xl text-ink">{reasonEntries[currentReason].title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-graphite">
                    {reasonEntries[currentReason].body}
                  </p>
                </motion.article>
              </AnimatePresence>

              <div className="mt-8 flex flex-wrap gap-2 text-xs text-graphite/60">
                {reasonEntries.map((reason, index) => (
                  <button
                    type="button"
                    key={reason.title}
                    onClick={() => {
                      setCurrentReason(index);
                      playPaperFlip();
                    }}
                    className={classNames(
                      'rounded-full border border-graphite/10 bg-white/70 px-3 py-1 shadow-sm transition hover:bg-parchment/90',
                      index === currentReason
                        ? 'bg-moss/20 text-graphite shadow-md'
                        : 'text-graphite/70'
                    )}
                  >
                    {reason.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TornDivider />

        <section className="notebook-margin">
          <div className="deckled-card px-6 py-10 sm:px-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-hand text-4xl text-ink">The future us..</h2>

                <div className="mt-2 h-6 w-24">
                  <Scribble variant="underline" color="#f4b7c6" className="h-full w-full" />
                </div>
              </div>
              <p className="max-w-sm text-sm text-graphite/70">
                this is a glimpse of our future if we are together. please enjoy it.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <motion.button
                  key={image.src}
                  type="button"
                  onClick={() => {
                    setZoomedImage(image);
                    playPaperFlip();
                  }}
                  className="relative flex flex-col gap-4 rounded-[26px] border border-graphite/10 bg-[#fffdf8] p-5 text-left shadow-lg transition"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : { rotate: index % 2 === 0 ? -2 : 3, scale: 1.02, translateY: -8 }
                  }
                >
                  <TapeStrip className="-top-6" />
                  <Scribble
                    variant={index % 2 === 0 ? 'loop' : 'underline'}
                    color="#f4d9a6"
                    className="pointer-events-none absolute -top-4 right-8 h-8 w-24 opacity-60"
                  />
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="h-56 w-full rounded-[18px] object-cover"
                    loading={index > 2 ? 'lazy' : 'eager'}
                  />
                  <span className="inline-flex items-center gap-2 rounded-full bg-parchment/80 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-graphite/60">
                    future plan {index + 1}
                    <span aria-hidden>⭐️</span>
                  </span>
                  <span className="font-hand text-2xl text-graphite/80">{image.caption}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <TornDivider />

        <section className="notebook-margin">
          <div className="deckled-card px-6 py-10 sm:px-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-hand text-4xl text-ink">Timeline</h2>

                <div className="mt-2 h-6 w-24">
                  <Scribble variant="underline" color="#f4b7c6" className="h-full w-full" />
                </div>
              </div>
              <p className="max-w-sm text-sm text-graphite/70">
                our story so far. this is just the beginning.
              </p>
            </div>

            <div className="relative mt-10">
              <span className="absolute left-5 top-0 hidden h-full border-l-4 border-dashed border-blush/60 sm:block" />
              <div className="space-y-8 sm:pl-12">
                {timelineEntries.map((entry, index) => (
                  <motion.article
                    key={entry.label}
                    className="relative rounded-[28px] border border-graphite/10 bg-[#fffdf8] p-6 shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.2 : 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: prefersReducedMotion ? 0 : index * 0.05,
                    }}
                  >
                    <span className="absolute -left-12 top-8 hidden h-14 w-14 rotate-3 items-center justify-center rounded-full border border-graphite/10 bg-white/80 text-2xl shadow-sm sm:flex">
                      {entry.emoji}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-parchment/80 px-4 py-1 text-xs uppercase tracking-[0.3em] text-graphite/60">
                      {entry.label}
                    </span>
                    <h3 className="mt-3 font-hand text-3xl lowercase text-ink">{entry.title}</h3>
                    <p className="mt-3 text-base text-graphite">{entry.body}</p>
                    <Scribble
                      variant={index % 2 === 0 ? 'loop' : 'underline'}
                      color="#f4d9a6"
                      className="mt-6 block h-6 w-28 opacity-70"
                    />
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TornDivider />

        <motion.section
          className="relative notebook-margin rounded-[36px] border border-graphite/10 bg-gradient-to-br from-[#fffdf8] via-[#f6f0e6] to-[#f2e8d8] px-6 py-14 shadow-deckle sm:px-16"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Scribble
            variant="loop"
            color="#f4b7c6"
            className="pointer-events-none absolute -top-6 left-10 hidden h-10 w-28 opacity-70 sm:block"
          />
          <motion.h2
            className="font-hand text-5xl text-ink"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
          >
            Do you want to be my girlfriend?
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={answerPromptKey}
              className="mt-4 max-w-2xl text-lg text-graphite"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {answerPromptText}
            </motion.p>
          </AnimatePresence>

          <div className="mt-12 grid w-full gap-6 md:grid-cols-2">
            <motion.button
              type="button"
              onClick={handleAnswer}
              disabled={answerLocked}
              aria-label="Yes"
              whileHover={
                prefersReducedMotion || answerLocked
                  ? {}
                  : { y: -10, rotate: -0.8, scale: 1.01 }
              }
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className={classNames(
                'group relative overflow-hidden rounded-[32px] border border-ink/15 bg-ink px-8 py-12 text-left text-[#fffef8] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/30 disabled:cursor-default disabled:opacity-70',
                answerLocked
                  ? 'opacity-70'
                  : 'shadow-[0_45px_110px_-60px_rgba(31,26,22,0.85)] hover:shadow-[0_55px_130px_-60px_rgba(31,26,22,0.95)]'
              )}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),rgba(255,255,255,0))] opacity-70 transition-opacity duration-700 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-16 right-[-18%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,172,204,0.45),rgba(255,172,204,0))] transition-all duration-700 group-hover:scale-125"
              />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <motion.span
                  aria-hidden
                  className="self-end text-3xl text-[#fff6eb]/80 drop-shadow-[0_12px_35px_rgba(0,0,0,0.35)]"
                  animate={
                    prefersReducedMotion || answerLocked
                      ? {}
                      : { y: [0, -6, 0] }
                  }
                  transition={{
                    duration: 2.4,
                    repeat: prefersReducedMotion || answerLocked ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  💖
                </motion.span>
                <span className="font-hand text-6xl leading-none drop-shadow-[0_12px_35px_rgba(0,0,0,0.35)]">
                  yes 💖
                </span>
                <motion.span
                  aria-hidden
                  className="text-4xl text-[#fff6eb]/80"
                  animate={
                    prefersReducedMotion || answerLocked
                      ? {}
                      : { x: [0, 8, 0] }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: prefersReducedMotion || answerLocked ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  →
                </motion.span>
              </div>
            </motion.button>

            <motion.button
              type="button"
              onClick={handleAnswer}
              disabled={answerLocked}
              aria-label="Also yes"
              whileHover={
                prefersReducedMotion || answerLocked
                  ? {}
                  : { y: -10, rotate: 0.8, scale: 1.01 }
              }
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className={classNames(
                'group relative overflow-hidden rounded-[32px] border border-transparent bg-gradient-to-br from-[#ffe7f3] via-[#fff6d9] to-[#f4fff4] px-8 py-12 text-left text-ink transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/25 disabled:cursor-default disabled:opacity-70',
                answerLocked
                  ? 'opacity-70'
                  : 'shadow-[0_45px_110px_-60px_rgba(31,26,22,0.35)] hover:shadow-[0_65px_140px_-70px_rgba(31,26,22,0.45)]'
              )}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,207,236,0.55),rgba(255,207,236,0))] opacity-70 transition-opacity duration-700 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -top-12 left-[-14%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(143,227,207,0.4),rgba(143,227,207,0))] transition-all duration-700 group-hover:scale-125"
              />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <motion.span
                  aria-hidden
                  className="self-end text-3xl text-ink/60"
                  animate={
                    prefersReducedMotion || answerLocked
                      ? {}
                      : { rotate: [-6, 6, -6] }
                  }
                  transition={{
                    duration: 2.1,
                    repeat: prefersReducedMotion || answerLocked ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  👉
                </motion.span>
                <span className="font-hand text-6xl leading-none text-ink drop-shadow-[0_18px_40px_rgba(31,26,22,0.15)]">
                  also yes 👉
                </span>
                <motion.span
                  aria-hidden
                  className="text-4xl text-ink/60"
                  animate={
                    prefersReducedMotion || answerLocked
                      ? {}
                      : { x: [0, 8, 0] }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: prefersReducedMotion || answerLocked ? 0 : Infinity,
                    ease: 'easeInOut',
                    delay: 0.2,
                  }}
                >
                  →
                </motion.span>
              </div>
            </motion.button>
          </div>

          <AnimatePresence>
            {answerLocked && toastVisible && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-graphite/10 bg-white/80 px-5 py-2 text-sm text-graphite shadow-sm"
                role="status"
              >
                <span aria-hidden>✨</span>
                <span>Secret page unlocked.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="pointer-events-none absolute right-6 top-6 text-2xl text-graphite/30"
            animate={
              prefersReducedMotion
                ? {}
                : { opacity: [0.4, 0.8, 0.4], y: [0, -4, 0], rotate: [0, 2, -1, 0] }
            }
            transition={{
              duration: 4,
              repeat: prefersReducedMotion ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            aria-hidden
          >
            ✨
          </motion.div>
        </motion.section>
      </main>

      <footer className="mx-auto mt-20 w-full max-w-5xl px-5 text-left text-xs uppercase tracking-[0.35em] text-graphite/50 sm:px-8">
        <p>crafted with messy love 💌</p>
        <div className="mt-3 flex flex-col gap-1 text-[11px] lowercase tracking-[0.2em] text-graphite/40">
          <span>signature: ____________________</span>
          <span>confession date: {new Date().toLocaleDateString()}</span>
        </div>
        <Scribble variant="loop" color="#f4d9a6" className="mt-3 block h-6 w-24 opacity-70" />
      </footer>

      <AnimatePresence>
        {qrStampVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            exit={{ opacity: 0, scale: 0.9, rotate: -12 }}
            transition={scribbleTransition}
            className="pointer-events-none fixed right-8 top-24 z-[60] rotate-[-6deg] rounded-lg border border-ink/30 bg-white px-4 py-3 text-xs uppercase tracking-[0.35em] text-ink/70 shadow-lg"
          >
            Book opened via QR
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeReceipt && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Receipt ${activeReceipt.title}`}
              className="relative w-[min(90vw,420px)] rounded-[28px] bg-tape/40 p-6 shadow-2xl"
              initial={{ scale: prefersReducedMotion ? 1 : 0.92, rotate: prefersReducedMotion ? 0 : -1 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: prefersReducedMotion ? 1 : 0.95, rotate: prefersReducedMotion ? 0 : 3 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <TapeStrip className="-top-4" />
              <div className="rounded-[22px] border border-graphite/20 bg-[#fffdf8] p-6 text-graphite shadow-lg">
                <span className="inline-flex items-center gap-2 rounded-full bg-parchment/70 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-graphite/60 shadow-sm">
                  {activeReceipt.emoji} receipt
                </span>
                <h3 className="mt-4 font-hand text-3xl text-ink">{activeReceipt.title}</h3>
                <Scribble variant="underline" color="#f4d9a6" className="mt-2 block h-6 w-24 opacity-70" />
                <p className="mt-4 text-base leading-relaxed">{activeReceipt.body}</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveReceipt(null);
                    playPaperFlip();
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-graphite/10 bg-white px-4 py-2 text-sm uppercase tracking-[0.3em] text-graphite/70 transition hover:bg-moss/10"
                >
                  close sticky note
                  <span aria-hidden>🗒️</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-[min(90vw,560px)] rounded-[30px] bg-[#fffdf8] p-6 shadow-2xl"
              initial={{ scale: prefersReducedMotion ? 1 : 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: prefersReducedMotion ? 1 : 0.94 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <TapeStrip className="-top-6" />
              <Scribble
                variant="loop"
                color="#f4d9a6"
                className="pointer-events-none absolute -top-4 left-8 h-8 w-24 opacity-70"
              />
              <img
                src={zoomedImage.src}
                alt={zoomedImage.caption}
                className="max-h-[70vh] w-full rounded-[20px] object-cover"
              />
              <div className="mt-4 flex items-center justify-between text-sm text-graphite/70">
                <span className="font-hand text-2xl text-ink">{zoomedImage.caption}</span>
                <button
                  type="button"
                  onClick={() => {
                    setZoomedImage(null);
                    playPaperFlip();
                  }}
                  className="rounded-full border border-graphite/20 bg-white px-4 py-2 uppercase tracking-[0.3em] text-graphite/70 transition hover:bg-moss/10"
                >
                  close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
