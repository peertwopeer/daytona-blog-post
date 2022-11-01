import React, { useState, useEffect } from "react";
import { findPost, updatePost } from "../../api/handlers";
import Loader from "../layout/loader";

export default function EditBlog(props) {
  const [isLoading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const result = await findPost(props.postId.toString());
      if (result.err) return window.alert(result.err);

      const selectedPost = await result.json();
      if (!selectedPost) return window.alert("Selected post not found");

      setForm(selectedPost);
      setLoading(false);
    };
    fetchPost();
  }, [props.postId]);

  const updateForm = (value) =>
    setForm((prev) => {
      return { ...prev, ...value };
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      id: props.postId.toString(),
      title: form.title,
      description: form.description,
    };

    await updatePost(formData).catch((e) => window.alert(e));

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
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title: </label>
              <input
                required
                id="title"
                type="text"
                value={form.title}
                className="form-control"
                onChange={(e) => updateForm({ title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description: </label>
              <input
                required
                type="text"
                id="description"
                className="form-control"
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-dark col-12 mt-4">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}
