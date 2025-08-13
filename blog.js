// blog.js
// Dynamically loads and renders markdown blog posts in blogposts.html

async function fetchMarkdownAsHtml(mdPath) {
    const response = await fetch(mdPath);
    const mdText = await response.text();
    // Use a CDN markdown parser (marked.js)
    return window.marked.parse(mdText);
}

async function loadBlogPosts() {
    const blogList = [
        { title: "Posts", file: "blog/posts.md" },
    ];
    const container = document.getElementById("blog-container");
    for (const post of blogList) {
        const postDiv = document.createElement("div");
        postDiv.className = "blog-post";
        const title = document.createElement("h2");
        title.textContent = post.title;
        postDiv.appendChild(title);
        const content = document.createElement("div");
        content.innerHTML = await fetchMarkdownAsHtml(post.file);
        postDiv.appendChild(content);
        container.appendChild(postDiv);
    }
}

document.addEventListener("DOMContentLoaded", loadBlogPosts);
