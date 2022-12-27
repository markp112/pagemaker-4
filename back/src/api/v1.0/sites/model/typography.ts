type HtmlUnits = 'px' | 'em' | 'rem';

interface SiteTypography {
  fontFamily: string,
  size: string,
  unit: HtmlUnits, 
};

export type { SiteTypography, HtmlUnits };
