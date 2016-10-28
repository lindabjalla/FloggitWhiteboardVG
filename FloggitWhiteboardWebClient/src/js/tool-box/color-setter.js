const setColor = (color) => {
  switch (color.value) {
    case 'Blue':
      return {
        name: 'Blue',
        code: 'dodgerblue'
      };
    case 'Green':
      return {
        name: 'Green',
        code: 'mediumseagreen'
      };
    case 'Pink':
      return {
        name: 'Pink',
        code: 'pink'
      };
    case 'Orange':
      return {
        name: 'Orange',
        code: 'lightsalmon'
      };
    default:
      return {
        name: 'Blue',
        code: 'dodgerblue'
      };
  }
};

export default setColor;