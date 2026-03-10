"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import SectionHeader from "@/components/SectionHeader";
import { REVIEWS } from "@/lib/reviews";
import { useTranslation } from "@/lib/i18n-context";

const StarIcon = () => (
  <svg className="w-4 h-4 fill-accent" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Reviews() {
  const { t } = useTranslation();
  const featuredReviews = REVIEWS.slice(0, 6);

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeader
          eyebrow={t("reviews.eyebrow")}
          title={t("reviews.title")}
          subtitle={t("reviews.subtitle")}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredReviews.map((review, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 border border-divider/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <span className="text-2xl text-accent/20 font-heading font-bold leading-none">&ldquo;</span>
              </div>
              
              <p className="text-sm text-foreground leading-relaxed mb-5">
                &ldquo;{review.text}&rdquo;
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-divider/50">
                <div>
                  <p className="font-medium text-foreground">{review.name}</p>
                  <p>{review.location}</p>
                </div>
                <p>{review.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          className="text-center mt-12"
        >
          <Link
            href="/reviews"
            className="inline-flex items-center justify-center border border-divider text-foreground font-medium text-sm px-6 py-3 rounded-full hover:border-muted transition-colors duration-200"
          >
            {t("reviews.viewAll")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
