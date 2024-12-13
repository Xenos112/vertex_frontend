import client from "ky";

// todo: complete the configuration
const vertex = client.create({
  credentials: "include",
  cache: "force-cache",
});

export default vertex;
