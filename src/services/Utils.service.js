import Colr from 'colr';

const UtilsService = {
  darkenHexColor(hexColor, coeff = 20) {
    return Colr.fromHex(hexColor).darken(coeff).toHex();
  },
  lightenHexColor(hexColor, coeff = 20) {
    return Colr.fromHex(hexColor).lighten(coeff).toHex();
  },
  changeOpacity(hexColor, opacity = 70) {
    let colrArr = Colr.fromHex(hexColor).toRgbArray();
    return `rgba(${colrArr[0]}, ${colrArr[1]}, ${colrArr[2]}, ${opacity / 100})`;
  },
  renderDateInterval(dateInterval) {
    return ((!!dateInterval.start) ? dateInterval.start : '')
     + ((!!dateInterval.start && !!dateInterval.end) ? ' - ' : '')
     + ((!!dateInterval.end) ? dateInterval.end : '');
  },
  compute3DStyles(color, x = 1, y = -1, darken = 1) {
    return {
      color: color,
      textShadow: `2px 2px ${UtilsService.lightenHexColor(color, darken * 15)}, 4px 4px ${UtilsService.lightenHexColor(color, darken * 30)}`,
    };
  }
};

export default UtilsService;
