const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/lists`;

// List Operations
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (listId) => {
  try {
    const res = await fetch(`${BASE_URL}/${listId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (listFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (listId, listFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${listId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteList = async (listId) => {
  try {
    const res = await fetch(`${BASE_URL}/${listId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Review Operations
const createReview = async (listId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${listId}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (listId, reviewId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${listId}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (listId, reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${listId}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  show,
  create,
  update,
  deleteList,
  createReview,
  updateReview,
  deleteReview,
};
