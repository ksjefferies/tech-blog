const newFormHandler = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('#project-name').value.trim();
  const post_content = document.querySelector('#project-desc').value.trim();

  if (post_title && post_content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ post_title, post_content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Post delete failed');
    }
  }
};

document
  .querySelector('.new-project-form').addEventListener('submit', newFormHandler);

document.querySelector('.project-list')?.addEventListener('click', delButtonHandler);