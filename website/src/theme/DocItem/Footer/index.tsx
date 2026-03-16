import React, {type ReactNode} from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import FeedbackWidget from '@site/src/components/FeedbackWidget';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  return (
    <>
      <FeedbackWidget />
      <Footer {...props} />
    </>
  );
}
