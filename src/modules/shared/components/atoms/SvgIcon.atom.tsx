import { Component, JSX, splitProps } from 'solid-js';

// #region INTERFACES
type SVGProps = JSX.SvgSVGAttributes<SVGSVGElement> & {
  id: 'icon-solidjs';
};
// #endregion

const SvgIcon: Component<SVGProps> = (props) => {
  const [id, rest] = splitProps(props, ['id']);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" {...rest}>
      <use href={`#${id.id}`} />
    </svg>
  );
};

export default SvgIcon;
