const movies = [
    {
        id: 1,
        title: "头文字D 01",
        type: "科幻 / 剧情",
        year: 2026,
        rating: 8.8,
        poster: "images/movie1.jpg",
        video: "videos/test.mp4",
        description: "这是一部用于测试电影网站功能的示例电影。"
    },

    {
        id: 2,
        title: "测试电影 02",
        type: "动作 / 冒险",
        year: 2026,
        rating: 8.5,
        poster: "images/movie2.png",
        video: "videos/test.mp4",
        description: "这是一部动作冒险类型的测试电影。"
    },

    {
        id: 3,
        title: "测试电影 03",
        type: "喜剧",
        year: 2026,
        rating: 8.2,
        poster: "images/movie3.jpeg",
        video: "videos/test.mp4",
        description: "这是一部喜剧类型的测试电影。"
    }
];

function renderMovies() {
    const hotMovies = document.getElementById("hot-movies");
    const latestMovies = document.getElementById("latest-movies");

    // 如果当前页面没有电影展示区域，就不执行
    if (!hotMovies || !latestMovies) {
        return;
    }

    // 根据电影数据生成卡片
    function createMovieCard(movie) {
        return `
            <a href="movie.html?id=${movie.id}" class="movie-link">
                <div class="movie-card">
                    <div class="movie-poster">
                        <img src="${movie.poster}" alt="${movie.title}">
                    </div>

                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <p class="movie-type">${movie.type}</p>
                        <p class="movie-type">${movie.year} · ⭐ ${movie.rating}</p>
                    </div>
                </div>
            </a>
        `;
    }

    // 前三部作为热门电影
    hotMovies.innerHTML = movies
        .slice(0, 3)
        .map(createMovieCard)
        .join("");

    // 全部电影作为最新电影展示
    latestMovies.innerHTML = movies
        .slice()
        .reverse()
        .map(createMovieCard)
        .join("");
}

// 页面加载完成后生成电影卡片
document.addEventListener("DOMContentLoaded", renderMovies);
function renderMovieDetail() {
    const titleElement = document.getElementById("detail-title");

    // 如果当前页面不是电影详情页，就不执行
    if (!titleElement) {
        return;
    }

    // 获取网址中的电影编号
    const params = new URLSearchParams(window.location.search);
    const movieId = Number(params.get("id"));

    // 根据编号找到对应的电影
    const movie = movies.find(item => item.id === movieId);

    // 如果没有找到，就默认显示第一部电影
    const currentMovie = movie || movies[0];

    // 更新网页标题
    document.title = currentMovie.title + " - 电影之家";

    // 更新海报、名称、类型、年份、评分和简介
    document.getElementById("detail-poster").src = currentMovie.poster;
    document.getElementById("detail-poster").alt = currentMovie.title;

    document.getElementById("detail-title").textContent = currentMovie.title;
    document.getElementById("detail-type").textContent = currentMovie.type;

    document.getElementById("detail-year").textContent =
        "上映年份：" + currentMovie.year;

    document.getElementById("detail-rating").textContent =
        "评分：⭐ " + currentMovie.rating;

    document.getElementById("detail-description").textContent =
        currentMovie.description;
        // 设置播放按钮对应的电影编号
const playButton = document.getElementById("play-button");

if (playButton) {
    playButton.href = "player.html?id=" + currentMovie.id;
}
}

// 页面加载完成后，自动显示对应电影的详情
document.addEventListener("DOMContentLoaded", renderMovieDetail);
function renderPlayer() {
    const videoPlayer = document.getElementById("movie-player");

    // 如果当前页面不是播放器页面，就不执行
    if (!videoPlayer) {
        return;
    }

    // 获取网址中的电影编号
    const params = new URLSearchParams(window.location.search);
    const movieId = Number(params.get("id"));

    // 查找对应的电影
    const movie = movies.find(item => item.id === movieId);

    // 如果没有找到，就默认使用第一部电影
    const currentMovie = movie || movies[0];

    // 设置视频地址和海报
    const videoSource = document.getElementById("movie-source");

    videoSource.src = currentMovie.video;
    videoPlayer.poster = currentMovie.poster;

    // 更新视频播放器并加载视频
    videoPlayer.load();

    // 更新网页标题
    document.title = currentMovie.title + " - 正在播放";
}

document.addEventListener("DOMContentLoaded", renderPlayer);

function setupMovieSearch() {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const searchMessage = document.getElementById("search-message");

    if (!searchInput || !searchButton || !searchMessage) {
        return;
    }

    // 获取首页的电影展示区域
    const hotMovies = document.getElementById("hot-movies");
    const latestMovies = document.getElementById("latest-movies");

    if (!hotMovies || !latestMovies) {
        return;
    }

    // 生成电影卡片
    function createMovieCard(movie) {
        return `
            <a href="movie.html?id=${movie.id}" class="movie-link">
                <div class="movie-card">
                    <div class="movie-poster">
                        <img src="${movie.poster}" alt="${movie.title}">
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <p class="movie-type">${movie.type}</p>
                        <p class="movie-type">${movie.year} · ⭐ ${movie.rating}</p>
                    </div>
                </div>
            </a>
        `;
    }

    // 执行搜索
    function searchMovies() {
        const keyword = searchInput.value.trim().toLowerCase();

        if (!keyword) {
            searchMessage.textContent = "请先输入电影名称。";
            return;
        }

        const results = movies.filter(movie =>
            movie.title.toLowerCase().includes(keyword)
        );

        // 清空原来的搜索提示
        searchMessage.textContent = "";

        // 隐藏原来的电影区域
        hotMovies.parentElement.style.display = "none";
        latestMovies.parentElement.style.display = "none";

        // 找到搜索结果的展示区域
        let searchSection = document.getElementById("search-results");

        if (!searchSection) {
            searchSection = document.createElement("section");
            searchSection.id = "search-results";
            searchSection.className = "container";

            searchSection.innerHTML = `
                <h2 class="section-title">🔎 搜索结果</h2>
                <div class="movie-grid" id="search-movies"></div>
            `;

            latestMovies.parentElement.after(searchSection);
        }

        searchSection.style.display = "block";

        const searchGrid = document.getElementById("search-movies");

        if (results.length === 0) {
            searchGrid.innerHTML = "";
            searchMessage.textContent = "没有找到相关电影，请尝试其他名称。";
            return;
        }

        searchGrid.innerHTML = results.map(createMovieCard).join("");
        searchMessage.textContent = `共找到 ${results.length} 部电影。`;
    }

    // 点击搜索按钮
    searchButton.addEventListener("click", searchMovies);

    // 按回车键搜索
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            searchMovies();
        }
    });

    // 清空搜索框后恢复首页电影区域
    searchInput.addEventListener("input", function() {
        if (searchInput.value.trim() === "") {
            searchMessage.textContent = "";

            hotMovies.parentElement.style.display = "";
            latestMovies.parentElement.style.display = "";

            const searchSection = document.getElementById("search-results");

            if (searchSection) {
                searchSection.style.display = "none";
            }
        }
    });
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchButton.click();
    }
});
}

document.addEventListener("DOMContentLoaded", setupMovieSearch);

function setupMovieCategories() {
    const categoryButtons = document.querySelectorAll(".category-button");
    const hotMovies = document.getElementById("hot-movies");
    const latestMovies = document.getElementById("latest-movies");

    // 如果当前页面没有分类按钮或电影区域，就不执行
    if (
        categoryButtons.length === 0 ||
        !hotMovies ||
        !latestMovies
    ) {
        return;
    }

    function createMovieCard(movie) {
        return `
            <a href="movie.html?id=${movie.id}" class="movie-link">
                <div class="movie-card">
                    <div class="movie-poster">
                        <img src="${movie.poster}" alt="${movie.title}">
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <p class="movie-type">${movie.type}</p>
                        <p class="movie-type">${movie.year} · ⭐ ${movie.rating}</p>
                    </div>
                </div>
            </a>
        `;
    }

    function filterMovies(category) {
        // 根据电影类型筛选
        const filteredMovies = category === "全部"
            ? movies
            : movies.filter(movie => movie.type.includes(category));

        // 更新热门电影区域
        hotMovies.innerHTML = filteredMovies
            .slice(0, 3)
            .map(createMovieCard)
            .join("");

        // 更新最新电影区域
        latestMovies.innerHTML = filteredMovies
            .slice()
            .reverse()
            .map(createMovieCard)
            .join("");

        // 更新按钮的选中状态
        categoryButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.category === category
            );
        });
    }

    // 给每个分类按钮绑定点击事件
    categoryButtons.forEach(button => {
        button.addEventListener("click", function() {
            filterMovies(button.dataset.category);
        });
    });
}

document.addEventListener("DOMContentLoaded", setupMovieCategories);
function renderRanking() {
    const rankingMovies = document.getElementById("ranking-movies");

    // 如果当前页面没有排行榜区域，就不执行
    if (!rankingMovies) {
        return;
    }

    // 按评分从高到低排序，不改变原始电影数据顺序
    const sortedMovies = movies
        .slice()
        .sort((a, b) => b.rating - a.rating);

    rankingMovies.innerHTML = sortedMovies.map(movie => `
        <a href="movie.html?id=${movie.id}" class="movie-link">
            <div class="movie-card">
                <div class="movie-poster">
                    <img src="${movie.poster}" alt="${movie.title}">
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-type">${movie.type}</p>
                    <p class="movie-type">⭐ ${movie.rating}</p>
                </div>
            </div>
        </a>
    `).join("");
}

document.addEventListener("DOMContentLoaded", renderRanking);