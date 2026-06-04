import { ExperienceTimeline } from "@/components/experience-timeline";
import { experiences } from "@/lib/experiences";

export function ExperienceShowcase() {
  return (
    <>
      <ExperienceTimeline experiences={experiences} />

      <div className="experience-timeline experience-timeline-static">
        {experiences.map((experience) => (
          <article
            className={`experience-card experience-card-${experience.side}${experience.current ? " is-current" : ""}`}
            key={experience.title}
          >
            <span className="experience-node" aria-hidden="true" />
            <div className="experience-card-inner">
              <div className="experience-card-top">
                <span className="experience-company">{experience.company}</span>
                {experience.status ? <span className="experience-status">{experience.status}</span> : null}
              </div>
              <h3>{experience.title}</h3>
              <p className="experience-location">{experience.location}</p>
              <p>{experience.description}</p>
              <div className="experience-badges" aria-label="Contexto da experiência">
                {experience.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
