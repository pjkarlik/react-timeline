import React, { useRef, useEffect, useState } from "react";

import ModalWindow from "./ModalWindow";
import ShaderWin from "./ShaderWin";
import LoadingBlock from "./LoadingBlock";

import css from "../styles/styles.less";

const Timeline = (props) => {
  const scrollArea = useRef();
  const lblock = useRef();
  const [shaderList, setShaderList] = useState({});
  const [hasLoaded, setHadLoaded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const fromPlace = 0;
  const viewBy = 25;

  useEffect(() => {
    const baseurl = "https://www.shadertoy.com/api/v1/shaders/query/"; ///query/pjkarlik?
    const queryPath = `pjkarlik?sort=newest&from=${fromPlace}&num=${viewBy}&key=NtrK4n`;
    fetch(baseurl + queryPath)
      .then((response) => response.json())
      .then((data) => setShaderList({ ...data }))
      .then(() => setHadLoaded(true));
  }, []);

  const openModal = (isOpen, content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = (isOpen) => {
    setModalContent(null);
    setModalOpen(false);
  };

  const makeTimeline = (shaders) => {
    console.log(shaders);
    const shaderlist = shaders.Results.map((item) => {
      return (
        <ShaderWin openModal={openModal} shaderId={item} key={`${item}`} />
      );
    });
    return <ul className={css.uline}>{shaderlist}</ul>;
  };

  return (
    <div className={css.wrapper} ref={scrollArea}>
      <section className={css.header}>
        <div className={css.container}>
          <h1>My Timeline of Shaders</h1>
          <p>Public Fragment Shader List</p>
        </div>
      </section>

      <section className={css.timeline}>
        {hasLoaded && <span>{makeTimeline(shaderList)}</span>}
        {<LoadingBlock ref={lblock} hasLoaded={hasLoaded} />}
      </section>
      {isModalOpen && (
        <ModalWindow content={modalContent} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Timeline;
