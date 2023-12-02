import { ButtonShape, ButtonSize, Variants } from '../../../../src/components/base/basebutton/model/model';

export const smallButton: ButtonSize = 'small';
export const mediumButton: ButtonSize = 'medium';
export const largeButton: ButtonSize = 'large';
export const rectangularButton: ButtonShape = 'rectangular';
export const circularButton: ButtonShape = 'circle';

export interface ButtonProps {
  disabled?: boolean,
  variant?: Variants,
  size?: ButtonSize,
  buttonShape?: ButtonShape,
  iconName?: string,
}

export const defaultProps: ButtonProps = {
  disabled: false,
  size: 'small',
  variant: 'solid',
  buttonShape: 'rectangular',
  iconName: 'test',
};