import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Music,
  Music2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

export default function App() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const cards = [
    {
      title: "SELAMAT PAGII ADIRA! 🌸",
      content:
        "Kita baru kenal beberapa hari hehe tapi i want to tell u somthing",
      gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHp1ZTEzNXM1MmZncG11ZWJjZ21mM2R6aTJhNXcwcGFkbjRjaW80ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gscZ8rvNwqMb8QRTdM/giphy.gif",
      color: "bg-rose-100",
    },
    {
      title: "Halo diraa, blehh ga kira-kira pdkt an?",
      content:
        "Aku pengen kenal kamu lebih lagi, dan sepertinya kita juga memiliki kesamaan",
      gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3ZiNXBtdHVqY3Z3bGN2YmRqOHRzbnhsNm95ZnFmemlpcGppdXJwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wctV7KMYwgLGo/giphy.gif",
      color: "bg-pink-100",
    },
    {
      title: "Gaada paksaan",
      content:
        "Tapi aku pengen banget kita bisa kenal lebih jauh, ngobrol-ngobrol santai, dan siapa tau bisa jadi temen curhat yang asik buat kamu hehe",
      gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWxvNG9leWJ5cmJ5OWt3MnE1eXNvZGs0MW81cXBpbjc4czd1cW1qbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/75XJCxvRps9aiTkyLt/giphy.gif",
      color: "bg-orange-100",
    },
    {
      title: "Kabari aku ya! ",
      content: "Sorry lagunya beda, soalnya kurang cocok disini menurutku",
      gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHh5ODN0MzBsbHEzMXd2bzJvOHFhbzE3ejM5NHc0bDV6aDZ5ems4dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQ9Zw/G3Wlf3go9Mi5TKxcUR/giphy.gif",
      color: "bg-green-100",
      isLast: true,
    },
  ];

  const [currentCard, setCurrentCard] = useState(0);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: 4 + Math.random() * 3,
          size: 15 + Math.random() * 20,
        },
      ]);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const play = () => {
      audioRef.current
        ?.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };
    window.addEventListener("click", play, { once: true });
    return () => window.removeEventListener("click", play);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 overflow-hidden relative p-4">
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ y: "110vh", x: `${h.left}vw`, opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
              transition={{ duration: h.duration, ease: "linear" }}
              className="absolute text-pink-400"
              style={{ fontSize: h.size }}
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 bg-white/70 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {isPlaying ? <Music2 className="animate-spin" /> : <Music />}
      </button>

      <audio ref={audioRef} loop src="/music/music.mp3" />

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="text-center z-10 max-w-md w-full"
          >
            <motion.img
              src="https://media4.giphy.com/media/12fWcohsEln5V6/giphy.gif"
              className="w-40 md:w-52 mx-auto mb-6 rounded-3xl shadow-2xl border-4 border-white/70"
              alt="welcome"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <h1 className="text-4xl md:text-6xl font-black text-pink-600 mb-4 drop-shadow-sm">
              HALO SITI ADIRA
            </h1>

            <p className="text-pink-700/80 mb-8 text-base md:text-lg font-medium">
              Ada something for u
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setStep(1);
                if (!isPlaying) toggleMusic();
              }}
              className="px-7 py-4 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 mx-auto"
            >
              Pencet Sini Dong
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-md z-10"
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0, scale: 0.96, rotateY: 30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.96, rotateY: -30 }}
                  transition={{ duration: 0.45 }}
                  className={`relative ${cards[currentCard].color} p-6 md:p-8 rounded-[2rem] shadow-2xl min-h-[500px] flex flex-col items-center text-center border border-white/60 overflow-hidden backdrop-blur-sm`}
                >
                  <div className="absolute top-4 right-4 opacity-30">
                    <Sparkles className="text-white" />
                  </div>

                  <motion.img
                    src={cards[currentCard].gif}
                    alt="Cute GIF"
                    className="w-36 h-36 md:w-40 md:h-40 mb-5 rounded-3xl shadow-lg object-cover"
                    referrerPolicy="no-referrer"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <h2 className="text-2xl md:text-3xl font-extrabold text-rose-700 mb-4 leading-tight">
                    {cards[currentCard].title}
                  </h2>

                  <p className="text-base md:text-lg text-rose-700/90 leading-relaxed px-1">
                    {cards[currentCard].content}
                  </p>

                  {cards[currentCard].isLast && (
                    <motion.a
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://wa.me/6283156980314"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Chat di WhatsApp
                    </motion.a>
                  )}

                  <div className="mt-auto w-full pt-6">
                    <div className="flex justify-center gap-2">
                      {cards.map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            currentCard === i ? "w-8 bg-rose-500" : "w-2 bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute left-0 right-0 -bottom-6 flex items-center justify-between px-2">
                <button
                  disabled={currentCard === 0}
                  onClick={() => setCurrentCard((p) => p - 1)}
                  className={`h-14 w-14 rounded-full flex items-center justify-center shadow-xl border border-white/50 backdrop-blur-md transition-all duration-300 ${
                    currentCard === 0
                      ? "bg-white/40 text-white/50 cursor-not-allowed"
                      : "bg-white/85 text-rose-500 hover:scale-110 hover:bg-white"
                  }`}
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  onClick={() =>
                    currentCard < cards.length - 1
                      ? setCurrentCard((p) => p + 1)
                      : setStep(0)
                  }
                  className="h-14 min-w-14 px-5 rounded-full flex items-center justify-center gap-2 shadow-2xl border border-white/60 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white font-bold hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <span className="hidden sm:inline">
                    {currentCard === cards.length - 1 ? "Ulang" : "Next"}
                  </span>
                  {currentCard === cards.length - 1 ? (
                    <Sparkles size={22} />
                  ) : (
                    <ChevronRight size={22} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-4 text-pink-600 text-sm font-medium">
        Dari Arkan
      </footer>
    </div>
  );
}