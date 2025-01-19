import { useEffect, useState } from "react";
import getPost from "../api/get-post";
import { Post as TPost } from "@/types";

/**
 * Custom hook to fetch a post from the backend.
 * @param {string} id - The ID of the post to fetch.
 * @returns {[TPost | null, string | null]} A tuple containing:
 *   - The post data of type TPost, or `null` if not yet fetched or if an error occurred.
 *   - A string containing the error message, or `null` if no error occurred.
 */
const usePostFetcher = (id: string): [TPost | null, string | null] => {
  const [postData, setPostData] = useState<TPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(id);
      if ("error" in post) {
        setError(post.error);
        return;
      }
      setPostData(post);
    };

    fetchPost();
  }, [id]);

  return [postData, error];
};

export default usePostFetcher;
