import client from "ky";

// todo: complete the configuration
const vertex = client.create({
  cache: "force-cache",
});

export default vertex;
