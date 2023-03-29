export const buildUrl = (parameters) => {
    parameters = {
        id: parameters?.id ? parameters.id : null,
        title: parameters?.title ? parameters.title : "godfather",
        year: parameters?.year ? parameters.year : "",
        page: parameters?.page ? parameters.page : 1
    }
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    const domain = "http://www.omdbapi.com/";
    if( parameters?.id ){
        return `${domain}?i=${parameters.id}&apiKey=${apiKey}`;
    } else {
        return `${domain}?s=${parameters.title}&type="movie"&y=${parameters.year}&page=${parameters.page}&apiKey=${apiKey}`;
    }
};