document.addEventListener('DOMContentLoaded', () => {
    const commentList = document.getElementById('commentList');
    const commentForm = document.getElementById('commentForm');

    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const commentInput = document.getElementById('comment');
        const comment = commentInput.value;

        try {
            const response = await fetch('/submit-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
            });

            const data = await response.json();

            // Assuming the response includes the submitted comment
            const submittedComment = data.comment;

            // Display the submitted comment on the frontend
            const commentItem = document.createElement('li');
            commentItem.textContent = submittedComment;
            commentList.appendChild(commentItem);

            // Clear the comment input field
            commentInput.value = '';
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    });
});
