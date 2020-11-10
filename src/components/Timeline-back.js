import React, { useEffect, useRef, useContext, useState } from "react";
import { Store } from "../Store";
import EventItem from "./EventItem";
import css from "../styles/styles.less";

const Timeline = (props) => {
  const { state, dispatch } = useContext(Store);
  const { events } = state;
  const [ currentTop, setTop] = useState(0);
  const scrollArea = useRef();
  const makeTimeline = (events) => {
    const evlist = events.map((item) => {
      return (
        <EventItem
          date={item.date}
          currentTop={currentTop}
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

  const onScroll = () => {
    setTop(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("load", onScroll);
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={css.wrapper} ref={scrollArea} onScroll={onScroll}>
      <section className={css.header}>
        <div className={css.container}>
          <h1>Paul J Karlik</h1>
          <p>Creative Technologist / UI Architect & Developer</p>
        </div>
      </section>

      <section className={css.timeline}>
        <ul>{makeTimeline(events)}</ul>
      </section>
    </div>
  );
};

export default Timeline;
