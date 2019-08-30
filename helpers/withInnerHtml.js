import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const withInnerHtml = Component => ({ html, ...props }) => {
  const renderHtml = htmlContent => ({
    __html: htmlContent,
  });

  return <Component {...props} dangerouslySetInnerHTML={renderHtml(html)} />;
};

withInnerHtml.propTypes = {
  html: PropTypes.string.isRequired,
};

export default withInnerHtml;
