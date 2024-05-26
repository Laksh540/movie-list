const baseUrl = "https://api.themoviedb.org/3";

class BaseService {
  //   constructor(props) {}
  getRequest(url: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    return fetch(`${baseUrl}${url}`, requestOptions).then((res) => res.json());
  }
}

export default BaseService;
