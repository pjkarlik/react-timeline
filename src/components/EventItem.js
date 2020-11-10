import React, { useEffect, useRef, useState } from "react";

import { useScrollPosition } from "../hooks/useScrollPosition";
import css from "../styles/styles.less";

const EventItem = (props) => {
  const timeItem = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const checkElement = (el) => {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  const handleClick = (e) =>{
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setIsVisible(checkElement(timeItem.current));
  }, []);

  useScrollPosition(({ currPos }) => {
    setIsVisible(checkElement(timeItem.current));
  });

  const { date, content, role, company, location } = props;
  return (
    <li ref={timeItem} className={isVisible ? css.inView : null}>
      <div onClick={handleClick}>
        <time>
          {date.from} - {date.to}
        </time>
        <h4 className={css.title}>{role}</h4>
        <h3 className={css.company}>{company}</h3>
        <p className={css.location}>{location}</p>
        <p className={`${css.description} ${isExpanded? css.open : null}`} >{content}</p>
      </div>
    </li>
  );
};

export default EventItem;
