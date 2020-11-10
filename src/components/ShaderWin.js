import React, { useEffect, useRef, useState } from "react";

import TagList from "./TagList";
import { useScrollPosition } from "../hooks/useScrollPosition";
import css from "../styles/styles.less";

const ShaderWin = (props) => {
  const timeItem = useRef();
  const { shaderId = "0000" } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shaderObject, setShaderObject] = useState({});
  const [hasLoaded, setHadLoaded] = useState(false);

  useEffect(() => {
    if (shaderId === undefined) return;
    fetch(`https://www.shadertoy.com/api/v1/shaders/${shaderId}?key=NtrK4n`)
      .then((response) => response.json())
      .then((data) => setShaderObject({ ...data }))
      .then(() => setHadLoaded(true));
  }, [shaderId]);

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

  const getTime = (timestamp) => {
    if (timestamp == 0) return "";
    return new Date(timestamp * 1000).toISOString().substr(0, 10);
  };

  const handleClick = (e) => {
    setIsExpanded(!isExpanded);
  };

  const openPreview = () => {
    props.openModal(true, shaderId);
  };

  useEffect(() => {
    setIsVisible(checkElement(timeItem.current));
  }, []);

  useScrollPosition(({ currPos }) => {
    setIsVisible(checkElement(timeItem.current));
  });
  const { Shader = {} } = shaderObject;
  const { info = {} } = Shader;
  if (shaderId === "WsVyRc") console.log(Shader);

  const previewImage = (
    <img
      title="Shader Preview Image"
      src={`https://www.shadertoy.com/media/shaders/${shaderId}.jpg`}
      className={css.thumbnail}
    />
  );
  return (
    <li
      ref={timeItem}
      className={isVisible ? `${css.inView} ${css.entry}` : css.entry}
    >
      {hasLoaded && (
        <div className={css.shaderBubbel}>
          <div className={css.row}>
            <div className={css.column} onClick={openPreview}>
              {previewImage}
            </div>
            <div className={css.column}>
              <h4 className={css.date}>{getTime(info.date)}</h4>
              <h3 className={css.title}>{info.name}</h3>

              <div className={css.social}>
                <div className={css.viewed} /> {info.viewed}{" "}
                <div className={css.liked} /> {info.likes}
              </div>

              <TagList tags={info.tags} />
            </div>
          </div>
          <div className={css.showHide} onClick={handleClick}>
            {isExpanded ? "hide description" : "expand description"}
          </div>
          <div className={css.row}>
            <div className={css.column}>
              <p
                className={`${css.description} ${isExpanded ? css.open : null}`}
              >
                {info.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default ShaderWin;
