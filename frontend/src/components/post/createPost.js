import React, { useState } from "react";
import { useNavigate } from "react-router";
import BlogForm from "../../forms/blogForm";
import Loader from "../layout/loader";

import { createPost } from "../../api/handlers";

export default function CreateBlog(props) {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const closeForm = () => {
    props.showCreateForm(false);
    navigate("/");
  };

  const onSubmit = async (payload) => {
    setLoading(true);
    await createPost(payload).catch((e) => window.alert(e));
    closeForm();
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
          <BlogForm submitHandler={onSubmit} />
        </div>
      )}
    </>
  );
}
