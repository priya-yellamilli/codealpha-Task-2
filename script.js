// 🌙 Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// 📸 Profile Picture Upload
document.getElementById("profile-pic-upload").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-pic").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 📝 Post Creation
document.getElementById("post-btn").addEventListener("click", function() {
    let postText = document.getElementById("post-input").value.trim();
    let fileInput = document.getElementById("file-input");
    let file = fileInput.files[0];

    if (!postText && !file) {
        alert("Please write something or upload a file!");
        return;
    }

    let postDiv = document.createElement("div");
    postDiv.classList.add("post");

    let content = `<p>${postText}</p>`;

    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            if (file.type.startsWith("image")) {
                content += `<img src="${e.target.result}" alt="Uploaded Image">`;
            } else if (file.type.startsWith("audio")) {
                content += `<audio controls src="${e.target.result}"></audio>`;
            } else {
                content += `<a href="${e.target.result}" download="${file.name}">📎 Download ${file.name}</a>`;
            }
            displayPost(postDiv, content);
        };
        reader.readAsDataURL(file);
    } else {
        displayPost(postDiv, content);
    }

    document.getElementById("post-input").value = "";
    fileInput.value = "";
});

// 📢 Function to Display Post
function displayPost(postDiv, content) {
    postDiv.innerHTML = `${content}
        <button class='like-btn'>❤️ <span>0</span></button>
        <button class='reaction-btn'>😂</button>
        <button class='reaction-btn'>🔥</button>
        <button class='reaction-btn'>😲</button>
        <button class='delete-btn'>🗑️ Delete</button>
        <div class='comments'>
            <input type='text' class='comment-input' placeholder='Write a comment...'>
            <button class='comment-btn'>Comment</button>
            <div class='comment-list'></div>
        </div>`;
    document.getElementById("posts").prepend(postDiv);
}

// 🎭 Like, Comment, Delete, Reactions
document.getElementById("posts").addEventListener("click", function(event) {
    if (event.target.classList.contains("like-btn")) {
        let likeCount = event.target.querySelector("span");
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    }
    if (event.target.classList.contains("reaction-btn")) {
        event.target.textContent = "✅ " + event.target.textContent;
    }
    if (event.target.classList.contains("delete-btn")) {
        event.target.closest(".post").remove();
    }
    if (event.target.classList.contains("comment-btn")) {
        let commentInput = event.target.previousElementSibling;
        let commentText = commentInput.value.trim();
        if (commentText === "") return;

        let commentList = event.target.nextElementSibling;
        let commentDiv = document.createElement("p");
        commentDiv.innerHTML = `${commentText} <button class='delete-comment'>🗑️</button>`;
        commentList.appendChild(commentDiv);

        commentInput.value = "";
    }
    if (event.target.classList.contains("delete-comment")) {
        event.target.parentElement.remove();
    }
});
