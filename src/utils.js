module.exports = {
  get_maxs: function (data) {
    const maxs = {};
    let i;
    let sp;
    let internal;
    for (sp in data) {
      if (data.hasOwnProperty(sp)) {
        const sp_data = data[sp];
        for (internal in sp_data) {
          if (maxs[internal] === undefined) {
            maxs[internal] = [];
          }
          if (sp_data.hasOwnProperty(internal)) {
            const internal_data = sp_data[internal];
            for (i = 0; i < internal_data.length; i++) {
              if ((maxs[internal][i] === undefined) ||
                (maxs[internal][i] < internal_data[i].length)) {
                maxs[internal][i] = internal_data[i].length;
              }
            }
          }
        }
      }
    }
    return maxs;
  }
};
