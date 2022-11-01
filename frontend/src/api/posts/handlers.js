import * as url from "./urlTypes";

const BASE_URL = "http://localhost:8000/api/posts/";
const ACCESS_TOKEN = process.env.REACT_APP_API_KEY;

const headers = {
  "Content-Type": "application/json",
  "x-access-token": ACCESS_TOKEN,
};

function fetchPosts(pageLimit, offset) {
  return new Promise(async (resolve, reject) => {
    await fetch(`${BASE_URL + url.FETCH_POSTS}/${pageLimit}/${offset}`, {
      method: "GET",
      headers,
    })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function fetchPostsCount() {
  return new Promise(async (resolve, reject) => {
    await fetch(BASE_URL + url.FETCH_POSTS_COUNT, {
      method: "GET",
      headers,
    })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function removePost(postId) {
  return new Promise(async (resolve, reject) => {
    await fetch(BASE_URL + url.DELETE_POST + `/${postId}`, {
      method: "DELETE",
      headers,
    })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function findPost(postId) {
  return new Promise(async (resolve, reject) => {
    await fetch(`${BASE_URL + url.FETCH_POST_BY_ID}/${postId}`, {
      method: "GET",
      headers,
    })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export { fetchPosts, fetchPostsCount, removePost, findPost };
