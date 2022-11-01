import React, { useState } from "react";
import BlogForm from "../../forms/blogForm";
import Loader from "../layout/loader";

import { createPost } from "../../api/handlers";

export default function CreateBlog(props) {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (payload) => {
    setLoading(true);
    await createPost(payload).catch((e) => window.alert(e));
    props.showCreateForm(false);
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
              className="btn-close modal-close-btn"
              onClick={() => props.showCreateForm(false)}
            />
          </div>
          <BlogForm submitHandler={handleSubmit} />
        </div>
      )}
    </>
  );
}
