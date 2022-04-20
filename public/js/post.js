const isEditing = false

const newCommentHandler = async (event) => {
    event.preventDefault();
    const comment_text = document.querySelector('#comment_text').value.trim();
    const post_id = window.location.pathname.split('/').at(-1)
    if (comment_text) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            window.location.reload()
        } else {
            alert('Failed to create Comment');
        }
    }

}

const saveComment = async (event) => {
    let parent = event.target.parentElement
    const id = parent.getAttribute('comment-id')
    let text = parent.querySelector('input').value;

    if (text) {
        const response = await fetch(`/api/comments/${id}`, {
            method: "PUT",
            body: JSON.stringify({ text }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) window.location.reload()
    }

}

const toggleEdit = async (event) => {
    let parent = event.target.parentElement

    let tmpButton = document.createElement("button");
    tmpButton.className = 'btn btn-primary'
    tmpButton.innerHTML = 'Save';
    tmpButton.addEventListener('click', saveComment)

    let tempText = document.createElement('input')
    let comment_text = parent.querySelector("#comment-text")

    tempText.value = comment_text.innerHTML
    parent.replaceChild(tmpButton, event.target)
    parent.replaceChild(tempText, comment_text)
}

const deleteComment = async (event) => {
    let parent = event.target.parentElement
    const id = parent.getAttribute('comment-id')

    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) window.location.reload()
}

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);


document.querySelectorAll("#edit-comment")?.forEach(element => element.addEventListener('click', toggleEdit))

document.querySelectorAll('#delete-comment')?.forEach(element => element.addEventListener('click', deleteComment))