import React from 'react';
import { TranslateConsumer } from './context';

/**
 * @param Parent
 * @returns {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
function withTranslate(Parent) {
  return React.forwardRef((props, ref) => (
    <TranslateConsumer>
      {(translate) => <Parent {...props} translate={translate} ref={ref} />}
    </TranslateConsumer>
  ));
}

export default withTranslate;
