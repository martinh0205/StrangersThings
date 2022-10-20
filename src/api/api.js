const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

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
