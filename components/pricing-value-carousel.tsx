"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PricingValueItem = {
  title: string;
  value: string;
  text: string;
};

export function PricingValueCarousel({ items }: { items: PricingValueItem[] }) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  const updateMobileScrollState = useCallback(() => {
    const track = mobileTrackRef.current;

    if (!track) {
      return;
    }

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 8);
    setCanScrollNext(track.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateMobileScrollState);
    window.addEventListener("resize", updateMobileScrollState);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateMobileScrollState);
    };
  }, [items.length, updateMobileScrollState]);

  const scrollMobileItems = (direction: "prev" | "next") => {
    const track = mobileTrackRef.current;

    if (!track) {
      return;
    }

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".pricing-value-card"));

    if (cards.length === 0) {
      return;
    }

    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    const currentIndex = cards.reduce((closestIndex, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCard = cards[closestIndex];
      const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;

      return Math.abs(cardCenter - viewportCenter) < Math.abs(closestCenter - viewportCenter) ? index : closestIndex;
    }, 0);
    const targetIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + (direction === "next" ? 1 : -1)));
    const targetCard = cards[targetIndex];
    const targetLeft = targetCard.offsetLeft - (track.clientWidth - targetCard.offsetWidth) / 2;

    track.scrollTo({
      left: targetLeft,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="pricing-value-board-desktop">
        <PricingValueGrid items={items} />
      </div>

      <div className="pricing-value-mobile-board">
        <div className={`pricing-value-mobile-viewport ${canScrollPrev ? "has-prev" : ""} ${canScrollNext ? "has-next" : ""}`}>
          {canScrollPrev ? (
            <button
              className="pricing-value-mobile-arrow pricing-value-mobile-arrow-prev"
              type="button"
              aria-label="Item anterior"
              onClick={() => scrollMobileItems("prev")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          ) : null}

          <div className="pricing-value-grid pricing-value-mobile-grid" ref={mobileTrackRef} onScroll={updateMobileScrollState}>
            {items.map((item) => (
              <PricingValueCard item={item} key={item.title} />
            ))}
          </div>

          {canScrollNext ? (
            <button
              className="pricing-value-mobile-arrow pricing-value-mobile-arrow-next"
              type="button"
              aria-label="Proximo item"
              onClick={() => scrollMobileItems("next")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

function PricingValueGrid({ items }: { items: PricingValueItem[] }) {
  return (
    <div className="pricing-value-grid">
      {items.map((item) => (
        <PricingValueCard item={item} key={item.title} />
      ))}
    </div>
  );
}

function PricingValueCard({ item }: { item: PricingValueItem }) {
  return (
    <article className="pricing-value-card">
      <span className="pricing-value-amount">{item.value}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  );
}
