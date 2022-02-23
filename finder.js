const user = {
  login: String,
  name: String,
  bio: String,
  avatar_url: String,
  public_repos: Number,
  followers: Number,
  following: Number,
  repos: Array,
};
const query = document.querySelector(".query");

async function getUser() {
  getRepos();
  const url = `https://api.github.com/users/${query.value}`;
  const data = await fetch(url);
  const userData = await data.json();

  if (userData.message === "Not Found") {
    alert("User not found");
    return;
  }

  user.login = userData.login;
  user.name = userData.name;
  user.bio = userData.bio;
  user.avatar_url = `https://github.com/${userData.login}.png`;
  user.public_repos = userData.public_repos;
  user.followers = userData.followers;
  user.following = userData.following;

  getAllData();
}

async function getRepos() {
  const url = `https://api.github.com/users/${query.value}/repos`;
  const data = await fetch(url);
  const repos = await data.json();
  user.repos = repos;
}

function getAllData() {
  const userInfo = document.getElementById("user-info");

  userInfo.setAttribute("style", "display: block");
  userInfo.innerHTML = `
    <div class="user-info">
      <div class="user-avatar">
          <h2 class="user-name">${user.name == null ? user.name = "No username" : user.name}</h2>
          <h3 class="user-login">${user.login}</h3>
          <img class="avatar_img" src="${user.avatar_url}" alt="${user.login}">
          <p class="bio">${
            user.bio == null ? (user.bio = "No bio") : user.bio
          }</p>
      </div>
      <div class="user-stats">
          <h2>Info</h2>
          <p>Repos: ${user.public_repos}</p>
          <p>Followers: ${user.followers}</p>
          <p>Following: ${user.following}</p>
      </div>
    </div>
    ${user.repos
      .map(
        (repo) => `<div class="repo">
      <h3 class="repo-name">${repo.name}</h3>
      <p class="repo-description">${
        repo.description == null
          ? (repo.description = "No description")
          : repo.description
      }</p>
      <p class="repo-language">${repo.language == null ? repo.language = "No language found" : repo.language}</p>
      <div class="repo-stats">
        <span>
          ⭐${repo.stargazers_count}
        </span>
        <span>
          💬${repo.watchers_count}
        </span>
        <span>
          📦${repo.forks_count}
        </span>
        <span>
          📅${new Date(repo.updated_at).toLocaleDateString('pt-br')}
        </span>
      </div>
      <a href="${repo.html_url}" target="_blank">
      <span>
      🔗${repo.html_url}
      </span>
      </a>
    </div>`
      )
      .join("")}
  `;
}
