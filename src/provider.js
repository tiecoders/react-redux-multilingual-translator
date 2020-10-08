import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translateKey, translate } from './utils';
import { TranslateProvider } from './context';

class multilingualTranslatorProvider extends React.Component {
  constructor(props) {
    super(props);
    if (!props.translations || !props.locale) {
      throw new Error(
        'Multilingual Translator translations or locale undefined'
      );
    }
  }

  static propTypes = {
    translations: PropTypes.object
  };

  static defaultProps = {
    translations: {}
  };

  translate = (key, placeholders, isHTML, options = {}) => {
    /**
     * Accept user defined translate
     */
    const translateFn = this.props.translate || translateKey;
    return translate(
      translateFn,
      this.props.translations,
      this.props.locale,
      key,
      placeholders,
      isHTML,
      options
    );
  };

  render() {
    return (
      <TranslateProvider value={this.translate}>
        {this.props.children}
      </TranslateProvider>
    );
  }
}

function mapPropsToState(state) {
  const { Intl } = state;
  return {
    ...Intl,
    key: Intl.locale
  };
}

export default connect(mapPropsToState)(multilingualTranslatorProvider);
