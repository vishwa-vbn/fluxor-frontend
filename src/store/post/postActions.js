// postActions.js
import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import {
  createPostCategory,
  getCategoriesByPostId,
  deletePostCategory,
} from "../postCategories/postCategoriesActions";
import {
  createPostTag,
  getTagsByPostId,
  deletePostTag,
} from "../postTags/postTagsActions";
// Action Types
export const POST_CREATE_PENDING = "POST_CREATE_PENDING";
export const POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS";
export const POST_CREATE_ERROR = "POST_CREATE_ERROR";

export const POST_FETCH_ALL_PENDING = "POST_FETCH_ALL_PENDING";
export const POST_FETCH_ALL_SUCCESS = "POST_FETCH_ALL_SUCCESS";
export const POST_FETCH_ALL_ERROR = "POST_FETCH_ALL_ERROR";

export const POST_FETCH_PUBLISHED_PENDING = "POST_FETCH_PUBLISHED_PENDING";
export const POST_FETCH_PUBLISHED_SUCCESS = "POST_FETCH_PUBLISHED_SUCCESS";
export const POST_FETCH_PUBLISHED_ERROR = "POST_FETCH_PUBLISHED_ERROR";

export const POST_FETCH_BY_SLUG_PENDING = "POST_FETCH_BY_SLUG_PENDING";
export const POST_FETCH_BY_SLUG_SUCCESS = "POST_FETCH_BY_SLUG_SUCCESS";
export const POST_FETCH_BY_SLUG_ERROR = "POST_FETCH_BY_SLUG_ERROR";

export const POST_UPDATE_PENDING = "POST_UPDATE_PENDING";
export const POST_UPDATE_SUCCESS = "POST_UPDATE_SUCCESS";
export const POST_UPDATE_ERROR = "POST_UPDATE_ERROR";

export const POST_DELETE_PENDING = "POST_DELETE_PENDING";
export const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS";
export const POST_DELETE_ERROR = "POST_DELETE_ERROR";

// Base API URL
const API_URL = "https://fluxor-backend.vercel.app/api/posts";

// CREATE POST
export const createPost = (data) => async (dispatch) => {
  dispatch({ type: POST_CREATE_PENDING });
  dispatch(showLoader());

  const token = getState().auth?.loginUser?.token;
  console.log("user is", getState().auth?.loginUser);
  const authorId = getState().auth?.loginUser?.user?.id;

  // Prepare post data with only allowed fields and add authorId
  const postData = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    featuredImage: data.featuredImage || "",
    authorId: authorId,
    status: data.status || "draft",
    publishedAt: data.publishedAt || "",
    metaTitle: data.metaTitle || "",
    metaDescription: data.metaDescription || "",
    isCommentsEnabled: data.isCommentsEnabled || false,
    viewCount: data.viewCount || 0,
  };

  try {
    // Create the post first
    const postResponse = await axios.post(API_URL, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("response id is", postResponse);
    const postId = postResponse?.data?.data?.id;

    // Handle category mapping if provided
    if (data.selectedCategory || data.categoryId) {
      const categoryId = data.selectedCategory || data.categoryId;
      await dispatch(createPostCategory({ postId, categoryId }));
    }

    // Handle tags mapping if provided
    if (data.selectedTags?.length || data.tags?.length) {
      const tags = data.selectedTags || data.tags;
      for (const tagId of tags) {
        await dispatch(createPostTag({ postId, tagId }));
      }
    }

    dispatch({ type: POST_CREATE_SUCCESS, payload: postResponse.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Post Created",
        type: "success",
        msg: "New post and its mappings have been created successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: POST_CREATE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Creation Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// GET ALL POSTS
// GET ALL POSTS
export const getAllPosts = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: POST_FETCH_ALL_PENDING });
  dispatch(showLoader());

  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Enhance each post with tags and categories from state
    const enhancedPosts = await Promise.all(
      res.data.data.map(async (post) => {
        await Promise.all([
          dispatch(getCategoriesByPostId(post.id)),
          dispatch(getTagsByPostId(post.id)),
        ]);

        const state = getState();
        const categories = state.postCategories?.categoriesByPost || [];
        const tags = state.postTags?.tagsByPost || [];

        const selectedCategory = categories.length > 0 ? categories[0].id : "";
        const selectedTags = tags.map(tag => tag.id);

        return {
          ...post,
          selectedCategory,
          selectedTags
        };
      })
    );

    dispatch({
      type: POST_FETCH_ALL_SUCCESS,
      payload: { 
        success: true,
        message: "Posts retrieved successfully",
        data: enhancedPosts 
      },
    });
  } catch (err) {
    dispatch({
      type: POST_FETCH_ALL_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// GET ALL PUBLISHED POSTS
export const getPublishedPosts = (page = 1, limit = 10) => async (dispatch) => {
  dispatch({ type: POST_FETCH_PUBLISHED_PENDING });
  dispatch(showLoader());

  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(
      `${API_URL}/status/published?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Enhance each post with tags and categories from state
    const enhancedPosts = await Promise.all(
      res.data.data.map(async (post) => {
        await Promise.all([
          dispatch(getCategoriesByPostId(post.id)),
          dispatch(getTagsByPostId(post.id)),
        ]);

        const state = getState();
        const categories = state.postCategories?.categoriesByPost || [];
        const tags = state.postTags?.tagsByPost || [];

        const selectedCategory = categories.length > 0 ? categories[0].id : "";
        const selectedTags = tags.map(tag => tag.id);

        return {
          ...post,
          selectedCategory,
          selectedTags
        };
      })
    );

    dispatch({
      type: POST_FETCH_PUBLISHED_SUCCESS,
      payload: { 
        success: true,
        message: "Published posts retrieved successfully",
        data: enhancedPosts 
      },
    });
  } catch (err) {
    dispatch({
      type: POST_FETCH_PUBLISHED_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// GET POST BY SLUG
export const getPostBySlug = (slug) => async (dispatch) => {
  dispatch({ type: POST_FETCH_BY_SLUG_PENDING });
  dispatch(showLoader());

  const token = getState().auth?.loginUser?.token;

  try {
    // Get basic post data
    const postRes = await axios.get(`${API_URL}/slug/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const postId = postRes.data.data.id;

    // Trigger category and tag fetches
    await Promise.all([
      dispatch(getCategoriesByPostId(postId)),
      dispatch(getTagsByPostId(postId)),
    ]);

    // Get categories and tags from Redux state
    const state = getState();
    const categories = state.postCategories?.categoriesByPost || [];
    const tags = state.postTags?.tagsByPost || [];

    // Extract IDs
    const selectedCategory = categories.length > 0 ? categories[0].id : "";
    const selectedTags = tags.map(tag => tag.id);

    // Construct complete post object
    const completePost = {
      ...postRes.data.data,
      selectedCategory,
      selectedTags
    };

    dispatch({
      type: POST_FETCH_BY_SLUG_SUCCESS,
      payload: { 
        success: true,
        message: "Post retrieved successfully",
        data: completePost 
      },
    });
  } catch (err) {
    dispatch({
      type: POST_FETCH_BY_SLUG_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};
// UPDATE POST
export const updatePost = (id, data) => async (dispatch) => {
  dispatch({ type: POST_UPDATE_PENDING });
  dispatch(showLoader());

  const token = getState().auth?.loginUser?.token;

  const postData = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    featuredImage: data.featuredImage || "",
    status: data.status || "draft",
    publishedAt: data.publishedAt || "",
    metaTitle: data.metaTitle || "",
    metaDescription: data.metaDescription || "",
    isCommentsEnabled: data.isCommentsEnabled || false,
    viewCount: data.viewCount || 0,
  };

  try {
    // Update basic post data
    const res = await axios.put(`${API_URL}/${id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Get current mappings from state after fetching
    await Promise.all([
      dispatch(getCategoriesByPostId(id)),
      dispatch(getTagsByPostId(id)),
    ]);

    const state = getState();
    const currentCategories = state.postCategories?.categoriesByPost || [];
    const currentTags = state.postTags?.tagsByPost || [];

    const currentCategoryIds = currentCategories.map(c => c.id);
    const currentTagIds = currentTags.map(t => t.id);
    const newCategoryId = data.selectedCategory || data.categoryId;
    const newTagIds = data.selectedTags || data.tags || [];

    // Handle category mapping
    if (newCategoryId) {
      if (currentCategoryIds.length > 0 && !currentCategoryIds.includes(newCategoryId)) {
        // Remove existing category if different
        await dispatch(deletePostCategory({ 
          postId: id, 
          categoryId: currentCategoryIds[0] 
        }));
        await dispatch(createPostCategory({ postId: id, categoryId: newCategoryId }));
      } else if (currentCategoryIds.length === 0) {
        // Add new category if none exists
        await dispatch(createPostCategory({ postId: id, categoryId: newCategoryId }));
      }
    } else if (currentCategoryIds.length > 0) {
      // Remove category if new one is not provided but old one exists
      await dispatch(deletePostCategory({ 
        postId: id, 
        categoryId: currentCategoryIds[0] 
      }));
    }

    // Handle tags mapping
    const tagsToRemove = currentTagIds.filter(tagId => !newTagIds.includes(tagId));
    const tagsToAdd = newTagIds.filter(tagId => !currentTagIds.includes(tagId));

    // Remove tags that are no longer needed
    if (tagsToRemove.length > 0) {
      await Promise.all(
        tagsToRemove.map(tagId => 
          dispatch(deletePostTag({ postId: id, tagId }))
        )
      );
    }

    // Add new tags
    if (tagsToAdd.length > 0) {
      await Promise.all(
        tagsToAdd.map(tagId => 
          dispatch(createPostTag({ postId: id, tagId }))
        )
      );
    }

    dispatch({ type: POST_UPDATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Post Updated",
        type: "success",
        msg: "Post and its mappings updated successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: POST_UPDATE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Update Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// DELETE POST
export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: POST_DELETE_PENDING });
  dispatch(showLoader());

  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: POST_DELETE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Post Deleted",
        type: "success",
        msg: "Post has been deleted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: POST_DELETE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Delete Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};
