import React, { useRef, useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import EventItem from "./EventItem";
import css from "../styles/styles.less";

const Timeline = (props) => {
  const { state } = useContext(Store);
  const { events } = state;
  const scrollArea = useRef();
  const [shaderList, setShaderList] = useState({});
  const [hasLoaded, setHadLoaded] = useState(false);
  useEffect(() => {
    fetch(
      "https://www.shadertoy.com/api/v1/shaders/query/pjkarlik?sort=newest&key=NtrK4n"
    )
      .then((response) => response.json())
      .then((data) => setShaderList({ data }))
      .then(() => setHadLoaded(true));
  }, []);

  console.log(shaderList);
  const makeTimeline = (events) => {
    const evlist = events.map((item) => {
      return (
        <EventItem
          date={item.date}
          content={item.content}
          role={item.role}
          company={item.company}
          location={item.location}
          key={`${item.time}`}
        />
      );
    });
    return <ul>{evlist}</ul>;
  };

  return (
    <div className={css.wrapper} ref={scrollArea}>
      <section className={css.header}>
        <div className={css.container}>
          <h1>Paul J Karlik</h1>
          <p>Creative Technologist / UI Architect & Developer</p>
        </div>
      </section>

      <section className={css.timeline}>
        {hasLoaded&&(<ul>{makeTimeline(events)}</ul>)}
      </section>
    </div>
  );
};

export default Timeline;
