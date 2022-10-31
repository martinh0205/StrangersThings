const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
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

export const fetchPosts = async (token) => {
  try {
    const { success, error, data } = await callAPI("/posts", {
      token: token,
    });

    if (success) {
      return { error: null, posts: data.posts };
    } else {
      return {
        error: error.message,
        posts: [],
      };
    }
  } catch (error) {
    console.error("there was an error fetching posts");

    return { error: "Failed to load Posts", posts: [] };
  }
};

export const registerUser = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/register", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });

    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }
  } catch (error) {
    console.error("there was an error registering the user", error);
    return {
      error: "Registration Failed.",
      token: null,
      message: null,
    };
  }
};

export const loginUser = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/login", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });

    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }
  } catch (error) {
    console.error("there was an error registering the user", error);
    return {
      error: "Registration Failed.",
      token: null,
      message: null,
    };
  }
};

export const fetchUser = async (token) => {
  try {
    const { success, error, data } = await callAPI("/users/me", {
      token: token,
    });
    if (success) {
      return {
        error: null,
        username: data.username,
      };
    } else {
      return {
        error: error.message,
        username: null,
      };
    }
  } catch (error) {
    console.error("failed to fetch user", error);

    return {
      error: "Failed to load User information",
      username: null,
    };
  }
};

export const createPost = async (
  token,
  title,
  description,
  price,
  location
) => {
  try {
    const post = {
      title: title,
      description: description,
      price: price,
    };

    if (location) {
      post.location = location;
    }

    const { success, error, data } = await callAPI("/posts", {
      token: token,
      method: "POST",
      body: {
        post: post,
      },
    });
    if (success) {
      return {
        error: null,
        post: data.post,
      };
    } else {
      return {
        error: error.message,
        post: null,
      };
    }
  } catch (error) {
    console.error("POST /post failed", error);

    return {
      error: "Failed to create Post",
      post: null,
    };
  }
};

export const deletePost = async (token, postId) => {
  try {
    const { success, error, data } = await callAPI(`/posts/${postId}`, {
      method: "DELETE",
      token: token,
    });
    if (success) {
      return {
        error: null,
        data: null,
      };
    } else {
      return {
        error: error.message,
        data: null,
      };
    }
  } catch (error) {
    console.error("DALATE /posts/postID failed:".error);
    return {
      error: "Failed to delete Post",
      data: null,
    };
  }
};

export const addComment = async (token, postId, content) => {
  try {
    const { success, error, data } = await callAPI(
      `/posts/${postId}/messages`,
      {
        token: token,
        method: "POST",
        body: {
          message: {
            content: content,
          },
        },
      }
    );
    if (success) {
      return {
        success: success,
        error: null,
        content: data.content,
      };
    } else {
      return {
        success: success,
        error: error.message,
        content: null,
      };
    }
  } catch (error) {
    console.error(`POST /posts/${postId}/messages failed`, error);

    return {
      success: false,
      error: "Failed to post comment",
      content: null,
    };
  }
};
