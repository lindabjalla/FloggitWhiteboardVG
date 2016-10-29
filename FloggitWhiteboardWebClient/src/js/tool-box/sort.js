export const sortById = (items) => {
    items.sort((b, a) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    return items;
  };

export const sortByDate = (items) => {
    items.sort((a, b) => {
      const timeA = Date.parse(a.timeCreated);
      const timeB = Date.parse(b.timeCreated);
      if (timeA > timeB) {
        return 1;
      }
      if (timeA < timeB) {
        return -1;
      }
      return 0;
    });
    return items;
  };
