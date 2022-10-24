const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = "Bearer ${token}";
  }
  return headers;
};

const callAPI = async (endpointPath, defaultOptions = {}) => {
  const { token, method, body } = defaultOptions;

  const options = {
    headers: makeHeaders(token),
  };

  if (method) {
    options.method = method;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASEURL}${endpointPath}`, options);
  const result = await response.json();

  return result;
};
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASEURL}/posts`);
    console.log("THIS IS THE RESPONSE", response);
    const { data } = await response.json();
    console.log("THIS IS DATA", data.posts);
    return data.posts;
  } catch (error) {
    console.error("there was an error fetching posts");
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASEURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    console.log("RESPONSE------>", response);
    const data = await response.json();
    console.log("------------data------------", data);
    return data;
  } catch (error) {
    console.error("There was an error registering the user", error);
  }
};

export const fetchUser = async (token) => {
  try {
    const response = await fetch(`${BASEURL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("USER RESP BODY ------------>", response);
    const { data } = await response.json();
    console.log("USER DATA ----->", data);
    return data;
  } catch {
    console.log(error);
  }
};

export const createPost = async () => {};
