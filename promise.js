function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }
  
  luckyDraw("Mirko")
    .then((result) => {
      console.log(result);
      return luckyDraw("Andrea");
    })
    .then((result) => {
      console.log(result);
      return luckyDraw("Domenico");
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error.message);
    })
    .finally(() => {
      console.log("Lucky draw completed for all players.");
    });