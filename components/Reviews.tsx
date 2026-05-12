import React, { useEffect, useRef } from 'react';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Reviews: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    });
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden">

      {/* Header */}
      <div ref={titleRef} className="text-center mb-12 px-6">
        <p className="text-tiko-yellow font-mono text-xs tracking-widest uppercase mb-3">
          Recensioni
        </p>
        <h2 className="font-display font-bold text-white text-3xl md:text-4xl drop-shadow-lg">
          Dicono di noi
        </h2>
        <p className="text-white/55 mt-3 text-base">
          Le parole di chi ha già sognato con Tiko
        </p>
      </div>

      {/* Marquee — riga 1 */}
      <div className="relative mb-4">
        <motion.div
          className="flex gap-5"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div
              key={`a-${i}`}
              className="w-72 flex-shrink-0 rounded-3xl p-6 flex flex-col"
              style={{
                background: 'linear-gradient(135deg, rgba(253,186,116,0.11) 0%, rgba(26,31,46,0.6) 100%)',
                border: '1px solid rgba(253,186,116,0.18)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Quote size={24} className="mb-3 opacity-20 text-tiko-yellow" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, si) => (
                  <Star key={si} size={13} fill="#FDE68A" color="#FDE68A" />
                ))}
              </div>
              <p className="text-white/75 text-sm leading-relaxed italic flex-1 mb-5">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #FB923C, #FACC15)',
                    color: '#1A1F2E',
                  }}
                >
                  {review.author.charAt(0)}
                </div>
                <span className="font-semibold text-white/90 text-sm">{review.author}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Fade laterale */}
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #1A1F2E 0%, transparent 100%)' }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #1A1F2E 0%, transparent 100%)' }} />
      </div>

      {/* Marquee — riga 2 (direzione inversa, velocità diversa) */}
      <div className="relative">
        <motion.div
          className="flex gap-5"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ repeat: Infinity, duration: 55, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div
              key={`b-${i}`}
              className="w-72 flex-shrink-0 rounded-3xl p-6 flex flex-col"
              style={{
                background: 'linear-gradient(135deg, rgba(167,139,250,0.09) 0%, rgba(26,31,46,0.6) 100%)',
                border: '1px solid rgba(167,139,250,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Quote size={24} className="mb-3 opacity-20" style={{ color: '#A78BFA' }} />
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, si) => (
                  <Star key={si} size={13} fill="#A78BFA" color="#A78BFA" />
                ))}
              </div>
              <p className="text-white/75 text-sm leading-relaxed italic flex-1 mb-5">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #A78BFA, #60A5FA)',
                    color: '#1A1F2E',
                  }}
                >
                  {review.author.charAt(0)}
                </div>
                <span className="font-semibold text-white/90 text-sm">{review.author}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #1A1F2E 0%, transparent 100%)' }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #1A1F2E 0%, transparent 100%)' }} />
      </div>

    </section>
  );
};

export default Reviews;
