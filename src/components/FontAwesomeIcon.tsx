import * as React from 'react';
// import { loadCSS } from 'fg-loadcss';
import Icon from '@mui/material/Icon';
import '@app/assets/fontawesome/css/all.css';
type TNode = HTMLElement | undefined;

export default function FontAwesomeIcon({ icon = '', group='fas' }) {
  // React.useEffect(() => {
  //   const parentNode = (document.querySelector('#font-awesome-css') || document.head.firstChild) as TNode
  //   const node = loadCSS(
  //     'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
  //     // Inject before JSS
  //     parentNode,
  //   );

  //   return () => {
  //     node.parentNode!.removeChild(node);
  //   };
  // }, []);
  return <Icon baseClassName={group} className={`fa-${icon}`} />;
}