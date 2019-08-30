import React from 'react';

export const CurrentUserContext = React.createContext(null);

const withCurrentUser = WrappedComponent => props => {
  return (
    <CurrentUserContext.Consumer>
      {value => <WrappedComponent {...props} currentUser={value} />}
    </CurrentUserContext.Consumer>
  );
};

export default withCurrentUser;
