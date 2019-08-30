import React from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import { connect } from 'formik';

class AutoSave extends React.Component {
  state = {
    isSaving: false,
  };

  save = debounce(() => {
    this.setState({ isSaving: true, saveError: undefined });

    const { formik } = this.props;

    this.props
      .onSave(formik.values)
      .then(
        () => this.setState({ isSaving: false, lastSaved: new Date() }),
        saveError => this.setState({ isSaving: false, saveError }),
      );
  }, 300);

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.formik.values, this.props.formik.values)) {
      this.save();
    }
  }

  render() {
    const { render } = this.props;

    if (!render) {
      return null;
    }

    return render(this.state);
  }
}

export default connect(AutoSave);
