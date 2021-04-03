import axios from "axios";

const sendFilmQuery = async (filmName) => {
  if (filmName.length > 1) {
    const res = await axios.get(
      `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${filmName}`,
      {
        headers: {
          "x-rapidapi-key":
            "e936ab5676mshe49ecbe5f2f77e6p157367jsnf91539be2481",
          "x-rapidapi-host":
            "imdb-internet-movie-database-unofficial.p.rapidapi.com",
          useQueryString: true,
        },
      }
    );
    return res.data.titles;
  } else return null;
};

export default sendFilmQuery;
