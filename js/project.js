if (typeof jQuery === "undefined") {
  console.error("Lỗi: jQuery chưa được tải!");
} else {
  $(document).ready(function () {
    console.log("jQuery đã chạy thành công!");

    // 1. Gom toàn bộ dự án từ các tab danh mục để hiển thị ra tab "Tất Cả"
    var allHtml = "";
    var $projects = $(".tab-pane").not("#all").find(".target-project");
    console.log(
      "Tìm thấy " + $projects.length + " dự án để đưa vào tab Tất cả.",
    );

    $projects.each(function () {
      allHtml +=
        '<div class="col-lg-4 col-md-6 mb-4 target-project">' +
        $(this).html() +
        "</div>";
    });
    $("#all-projects-container").html(allHtml);

    // 2. Hàm chuyển tab THỦ CÔNG - không phụ thuộc plugin tab của Bootstrap
    function switchTab(targetId) {
      var $targetTab = $('#projectDashboard a[href="' + targetId + '"]');
      if ($targetTab.length === 0) {
        console.warn("Không tìm thấy tab nào có id là " + targetId);
        return;
      }
      // Cập nhật trạng thái active cho các nav-link
      $("#projectDashboard .nav-link").removeClass("active");
      $targetTab.addClass("active");

      // Cập nhật trạng thái hiển thị cho các tab-pane
      $(".tab-pane").removeClass("show active");
      $(targetId).addClass("show active");
    }

    // 3. Gắn sự kiện click cho toàn bộ tab (thay thế data-toggle="tab")
    $("#projectDashboard .nav-link").on("click", function (e) {
      e.preventDefault();
      var targetId = $(this).attr("href"); // vd: "#can-ho"
      switchTab(targetId);

      // (tuỳ chọn) cập nhật URL để phản ánh tab đang xem, không load lại trang
      var cat = targetId.replace("#", "");
      if (cat === "all") {
        history.replaceState(null, "", window.location.pathname);
      } else {
        history.replaceState(null, "", "?cat=" + cat);
      }
    });

    // 4. Tự động chuyển tab dựa trên URL (?cat=can-ho) khi tải trang
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("cat");
    if (category) {
      console.log("Phát hiện tham số URL: " + category);
      switchTab("#" + category);
    }
  });
}
