const getVerses = async (surah, range = undefined) => {
  const url = `https://al-quran1.p.rapidapi.com/${surah}/${range}`
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e768be7642msh318cdfc156609f8p1b7531jsn56d31432db27",
      "X-RapidAPI-Host": "al-quran1.p.rapidapi.com",
    },
  };
  const response = await (await fetch(url, options)).json();
  return response;
};
module.exports = getVerses;
