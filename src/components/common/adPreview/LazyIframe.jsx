import React from "react";
import PropTypes from "prop-types";

const LazyIframe = ({ src, title, width, height, frameBorder, allow, allowFullScreen, style, className }) => (
  <iframe
    src={src}
    title={title}
    width={width}
    height={height}
    frameBorder={frameBorder}
    allow={allow}
    allowFullScreen={allowFullScreen}
    style={style}
    className={className}
    loading="lazy"
  />
);

LazyIframe.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  frameBorder: PropTypes.string,
  allow: PropTypes.string,
  allowFullScreen: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default LazyIframe;