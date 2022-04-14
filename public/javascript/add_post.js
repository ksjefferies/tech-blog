async function addPost(event) {
    event.preventDefault();

    const title = document.querySelector(`input[name='title']`).value;
    const text = document.querySelector(`input[name='post-text']`).value;

    const response = await fetch('api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            text
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
};

document.querySelector('#add-post').addEventListener('submit', addPost)