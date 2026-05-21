import { marqueeStacks, StackIcon } from "@/lib/stacks";

function StackTrack() {
  return (
    <div className="stack-marquee-track">
      {marqueeStacks.map((stack) => (
        <span className="stack-logo-item" key={stack}>
          <StackIcon stack={stack} />
          {stack}
        </span>
      ))}
    </div>
  );
}

export function StackMarquee() {
  return (
    <div className="hero-stack-marquee hero-stack-strip hero-animate hero-animate-5" aria-label="Principais stacks">
      <p>
        Principais <strong>Stacks</strong>
      </p>
      <div className="stack-marquee" aria-hidden="true">
        <StackTrack />
        <StackTrack />
      </div>
    </div>
  );
}
