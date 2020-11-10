import React from "react";

import css from "../styles/styles.less";

const TagList = (props) => {
  const { tags } = props;
  const getTags = (data) => {
    if (data.length < 1) return;
    return data.map((item) => {
      return (
        <li key={`${item}`} className={css.tag}>
          {item}
        </li>
      );
    });
  };

  return <ul className={css.tags}>{getTags(tags)}</ul>;
};

export default TagList;
