import React, { useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../layout/loader";

import { createPost } from "../../api/handlers";

export default function CreateBlog(props) {
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  const updateForm = (value) =>
    setForm((prev) => {
      return { ...prev, ...value };
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = { ...form };

    await createPost(formData).catch((e) => window.alert(e));

    closeForm();
  };

  const closeForm = () => {
    props.showCreateForm(false);
    navigate("/");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-light p-4">
          <div className="modal-header">
            <h5>CREATE NEW BLOG</h5>
            <button
              type="button"
              class="btn-close modal-close-btn"
              onClick={() => closeForm()}
            />
          </div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                required
                id="title"
                type="text"
                value={form.title}
                className="form-control"
                placeholder="Enter Title"
                onChange={(e) => updateForm({ title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                required
                type="text"
                id="description"
                className="form-control"
                value={form.description}
                placeholder="Enter Description"
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
