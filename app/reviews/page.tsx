"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { REVIEWS } from "@/lib/reviews";

const ease = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const StarIcon = () => (
  <svg className="w-4 h-4 fill-accent" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function ReviewsPage() {
  const averageRating = (REVIEWS.reduce((acc, r) => acc + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={item}
            className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
          >
            Reviews
          </motion.span>
          <motion.h1
            variants={item}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-6 max-w-[16ch]"
          >
            Wat onze klanten zeggen.
          </motion.h1>
          <motion.p
            variants={item}
            className="text-muted text-base md:text-lg max-w-[45ch] mb-4"
          >
            Beoordeeld met {averageRating} van de 5 sterren door {REVIEWS.length} tevreden klanten.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-divider mt-12"
        >
          {REVIEWS.map((review, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="bg-background p-8"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              
              <p className="text-sm text-foreground leading-relaxed mb-4">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted">
                <div>
                  <p className="font-medium text-foreground">{review.name}</p>
                  <p>{review.location}</p>
                </div>
                <p>{review.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
