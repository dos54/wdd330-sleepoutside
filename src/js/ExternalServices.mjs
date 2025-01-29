const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    // const res = await fetch(this.path);
    // const data = await convertToJson(res);
    // return data;
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    console.log(data);
    return data.Result;
  }
  async findProductById(id) {
    const data = await fetch(`${baseURL}product/${id}`).then(convertToJson);
    console.log(data)
    return data.Result
  }

  checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }

    return fetch(`${baseURL}checkout`, options);
  }

  
}
