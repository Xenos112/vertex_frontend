// TODO: implement (finish)

import vertex from "..";

type ReturnResponse = {
  message: string;
  urls: string[];
};

export default async function uploadMedias(formData: FormData) {
  //TEST: see if the fetch accepts formData as a body
  const res = await vertex.post<ReturnResponse>("http://localhost:4000/upload", {
    body: formData,
  });

  if (res.status !== 200) {
    throw new Error("Failed to upload medias");
  }

  const data = await res.json();
  return data;
}
