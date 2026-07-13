(function () {
    "use strict";

    function getParam(name) {
        var params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    function setText(id, value) {
        var element = document.getElementById(id);
        if (element && value) {
            element.textContent = value;
        }
    }

    function setImage(id, src, alt) {
        var image = document.getElementById(id);
        if (image && src) {
            image.setAttribute("src", src);
            image.setAttribute("alt", alt || "Video DanaHome");
        }
    }

    function fillVideoDetail() {
        var videoId = getParam("v") || "RRQveNvrIYY";
        var title = getParam("title") || "Vinhomes Ocean Park";
        var subtitle = getParam("subtitle") || "Căn hộ hiện đại, bảng màu trung tính và ánh sáng mở";
        var description = getParam("desc") ||
            "Video ghi lại toàn bộ hành trình hoàn thiện căn hộ từ khu vực khách bếp đến phòng ngủ master, tập trung vào giải pháp tối ưu công năng và tính đồng bộ vật liệu.";
        var thumb = getParam("thumb") || "../images/banner-main-1.avif";

        var iframe = document.getElementById("videoPlayerFrame");
        if (iframe) {
            iframe.setAttribute("src", "https://www.youtube.com/embed/" + encodeURIComponent(videoId) + "?autoplay=1&rel=0");
            iframe.setAttribute("title", title);
        }

        setText("videoPlayerTitle", title);
        setText("videoDetailTitle", title);
        setText("videoPlayerSubtitle", subtitle);
        setText("videoPlayerDescription", description);
        setImage("videoPlayerThumb", thumb, title);

        document.title = title + " - DanaHome";

        var youtubeLink = document.getElementById("videoYoutubeLink");
        if (youtubeLink) {
            youtubeLink.setAttribute("href", "https://youtu.be/" + encodeURIComponent(videoId));
        }

        return title;
    }

    function toggleRelatedVideos(currentTitle) {
        var container = document.getElementById("videoRelatedGrid");
        if (!container) {
            return;
        }

        var MAX_VISIBLE = 4;
        var cards = Array.prototype.slice.call(container.querySelectorAll(".video-related-card"));
        var shown = 0;

        cards.forEach(function (card) {
            var isCurrent = card.getAttribute("data-title") === currentTitle;
            var canShow = !isCurrent && shown < MAX_VISIBLE;

            card.style.display = canShow ? "" : "none";
            if (canShow) {
                shown += 1;
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        var currentTitle = fillVideoDetail();
        toggleRelatedVideos(currentTitle);

        // Nút Video 3D - hoạt động giống như click vào card bên dưới
        var btn3D = document.getElementById("video3DBtn");
        if (btn3D) {
            btn3D.addEventListener("click", function (e) {
                e.preventDefault();
                var params = new URLSearchParams({
                    v: "RRQveNvrIYY",
                    title: "Video 3D Walkthrough - DanaHome",
                    subtitle: "Trải nghiệm không gian nội thất qua phối cảnh 3D chân thực",
                    desc: "Bản dựng 3D walkthrough giúp khách hàng hình dung rõ ngôn ngữ thiết kế, nhịp điệu ánh sáng và hệ tủ âm tường trong không gian thực tế trước khi thi công.",
                    thumb: "../images/banner-main-1.avif"
                });
                window.location.href = "VideoPlayer.html?" + params.toString();
            });
        }
    });
})();