const getVerses = async (reaction) => {
    const url = `https://api.otakugifs.xyz/gif?reaction=${reaction}`
    const response = await (await fetch(url)).json();
    return response.url;
  };
  module.exports = getVerses;
  