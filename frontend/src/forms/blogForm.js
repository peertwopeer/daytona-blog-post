import React, { useState } from "react";

export default function BlogForm(props) {
  const [form, setForm] = useState({
    title: props.formData?.title ?? "",
    description: props.formData?.description ?? "",
  });

  const updateForm = (value) =>
    setForm((prev) => {
      return { ...prev, ...value };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.submitHandler({ ...form });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
  );
}
