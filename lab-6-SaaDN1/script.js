const initialLikes = 2400;
const initialDislikes = 120;

let likesCount = initialLikes;
let dislikesCount = initialDislikes;

const likesBtn = document.getElementById('likeBtn');
const dislikesBtn = document.getElementById('dislikeBtn');
const commentBox = document.getElementById('commentBox');
const submitBtn = document.getElementById('submit');
const clearBtn = document.getElementById('clear');
const commentsList = document.getElementById('commentsList');

likesBtn.innerText = "👍" + likesCount;
dislikesBtn.innerText = "👎" + dislikesCount;

likesBtn.addEventListener('click', () => {
    likesCount++;
    likesBtn.innerText = "👍" + likesCount;
    setCookie();
    disableAllButtons()
});

dislikesBtn.addEventListener('click', () => {
    dislikesCount++;
    dislikesBtn.innerText = "👎" + dislikesCount;
    setCookie();
    disableAllButtons()
});

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addComment();
    submitBtn.disabled = true;
    clearBtn.disabled = true;
    setCookie();
});

function addComment() {
    const commentText = commentBox.value.trim();
    if (commentText !== "") {
        const commentItem = document.createElement('li');
        commentItem.innerText = commentText;
        commentsList.appendChild(commentItem);
        commentBox.value = "";
    }
}

function setCookie() {
    const expireOn = new Date(Date.now() + 2 * 60 * 1000);
    const cookieString = "voted=true; path=/; expires=" + expireOn.toUTCString();
    document.cookie = cookieString;
}

clearBtn.addEventListener('click', () => {
    commentBox.value = "";
    const expireOn = new Date(Date.now() - 1);
    const cookieString = "voted=true; path=/; expires=" + expireOn.toUTCString();
    document.cookie = cookieString;
});

function disableAllButtons() {
    likesBtn.disabled = true;
    dislikesBtn.disabled = true;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.cookie.includes('voted=true')) {
        disableAllButtons();
    }
});