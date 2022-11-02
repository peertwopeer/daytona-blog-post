import React, { useEffect, useState } from "react";
import CreatePost from "../src/components/post/createPost";
import EditPost from "../src/components/post/editPost";
import Header from "../src/components/layout/header";
import Loader from "../src/components/layout/loader";

import { fetchPosts, fetchPostsCount, removePost } from "../src/api/handlers";

const PAGE_LIMIT = 5;
const POST = (props) => (
  <tr className="bg-light">
    <td className="text-center">
      <h3>
        <u>{props.post.title}</u>
      </h3>
      <p>{props.post.description}</p>
      <div>
        <button
          type="button"
          className="btn btn-warning btn-sm me-2"
          onClick={() => props.deletePost(props.post._id)}
        >
          DELETE BLOG
        </button>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => props.updatePost(props.post._id)}
        >
          UPDATE BLOG
        </button>
      </div>
    </td>
  </tr>
);

export default function App() {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [enableCreate, showCreateForm] = useState(false);
  const [enableUpdate, setEnableUpdate] = useState(false);
  const [postsCount, setPostsTotalCount] = useState(0);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const getPostsCount = async () => {
    const result = await fetchPostsCount();
    if (result.err) return window.alert(result.err);

    setPostsTotalCount(await result.json());
  };

  useEffect(() => {
    if (enableCreate || enableUpdate) return;
    const getPosts = async () => {
      setLoading(true);

      const result = await fetchPosts(PAGE_LIMIT, offset);
      if (result.err) return window.alert(result.err);

      setPosts(await result.json());
      setLoading(false);
    };
    getPosts();
    getPostsCount();
  }, [offset, enableCreate, enableUpdate]);

  const postList = () =>
    posts.map((post) => (
      <POST
        post={post}
        key={post._id}
        deletePost={() => handleDeletePost(post._id)}
        updatePost={() => handleUpdatePost(post._id)}
      />
    ));

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure?")) {
      await removePost(id).then((response) => {
        if (response.err) return window.alert(response.err);
        setPosts(posts.filter((el) => el._id !== id));
      });
    }
  };
  const handleUpdatePost = (postId) => {
    setSelectedBlogId(postId);
    setEnableUpdate(true);
  };
  const handleOffset = () => {
    let offset_increment = 5;
    setOffset(posts.length && postsCount ? offset + offset_increment : 0);
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <>
      {enableCreate || enableUpdate ? (
        <div className="form_modal fade_in mt-5 p-2 ">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="bg-light">
                {enableUpdate ? (
                  <EditPost
                    postId={selectedBlogId}
                    setEnableUpdate={setEnableUpdate}
                  />
                ) : (
                  <CreatePost showCreateForm={showCreateForm} />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Header showCreateForm={showCreateForm} />
      <table className="table table-striped mt-5">
        <tbody>{postList()}</tbody>
      </table>
      <div className="d-grid gap-2 mb-4">
        {!!postsCount ? (
          <button
            onClick={() => handleOffset()}
            className="btn btn-primary bg-gradient col-6 center"
          >
            {!posts.length ? "Click to reset" : "Load More"}
          </button>
        ) : (
          "No posts found"
        )}
      </div>
    </>
  );
}
