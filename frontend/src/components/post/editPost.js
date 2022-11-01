import React, { useState, useEffect } from "react";
import { findPost, updatePost } from "../../api/handlers";
import BlogForm from "../../forms/blogForm";
import Loader from "../layout/loader";

export default function EditBlog(props) {
  const [isLoading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const result = await findPost(props.postId.toString());
      if (result.err) return window.alert(result.err);

      const post = await result.json();
      if (!post) return window.alert("Selected post not found");

      setSelectedPost(post);
      setLoading(false);
    };
    fetchPost();
  }, [props.postId]);

  const onSubmit = async (formData) => {
    setLoading(true);
    const payload = {
      id: props.postId,
      ...formData,
    };
    await updatePost(payload).catch((e) => window.alert(e));
    props.setEnableUpdate(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-light p-4">
          <div className="modal-header">
            <h5>UPDATE THE BLOG</h5>
            <button
              type="button"
              class="btn-close modal-close-btn"
              onClick={() => props.setEnableUpdate(false)}
            />
          </div>
          <BlogForm submitHandler={onSubmit} formData={selectedPost} />
        </div>
      )}
    </>
  );
}
