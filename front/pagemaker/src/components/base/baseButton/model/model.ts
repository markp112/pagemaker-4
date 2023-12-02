export type Variants = 'solid' | 'outline' | 'text' | 'default';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'rectangular' | 'circle';
export type ButtonState = 'active' | 'inActive';

export type buttonShapeKey = `${ButtonSize}_${ButtonShape}`;
export type SizeMap = { [ key in buttonShapeKey ]: string };
export type ButtonStateMap = { [ key in ButtonState ]: string };
export type VariantMap = { [ key in Variants ]: string };

const CIRCLE = 'rounded-full';  
const RECTANGULAR = 'rounded-md';

export const variantMap: VariantMap = {
  solid: 'bg-site-primary text-site-surface',
  outline: 'border border-site-primary text-on-surface hover:bg-site-primary-light',
  text: 'text-site-primary',
  default: 'bg-site-primary text-site-surface',
};
export const sizeMap: SizeMap = {
  small_rectangular: `h-6 w-auto px-2 text-xs ${RECTANGULAR}`,
  small_circle: `h-8 w-8 text-xs ${CIRCLE}`,
  medium_rectangular: `h-8 w-auto px-4 text-sm ${RECTANGULAR}`,
  medium_circle: `h-10 w-10 text-sm ${CIRCLE}`,
  large_rectangular: `h-10 w-auto px-6 text-md ${RECTANGULAR}`,
  large_circle: `h-16 w-16 text-md ${CIRCLE}`,
};
export const disabledMap: ButtonStateMap = {
  active: 'cursor-pointer hover:bg-site-primary-dark text-site-surface hover:text-gray-200 transition ease-in-out delay-150',
  inActive: 'cursor-not-allowed text-accent-1 bg-gray-300 border-gray-600',
};

