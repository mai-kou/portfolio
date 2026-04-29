const shootingImageList = $(".shooting-works-list a[data-modal-img]")
  .map(function () {
    return $(this).data("modal-img");
  })
  .get();

const drawImageList = $(".draw-works-list a[data-modal-img]")
  .map(function () {
    return $(this).data("modal-img");
  })
  .get();

let currentShootingIndex = -1;
let currentGalleryType = null;

function getCurrentGalleryList() {
  if (currentGalleryType === "shooting") {
    return shootingImageList;
  }
  if (currentGalleryType === "draw") {
    return drawImageList;
  }
  return [];
}

function applyLandscapeScale(imgEl) {
  var img = imgEl[0];
  if (img.naturalWidth > img.naturalHeight) {
    imgEl.css({ transform: "scale(0.8)", "transform-origin": "center" });
  } else {
    imgEl.css({ transform: "", "transform-origin": "" });
  }
}

function showModalImage(imageSrc) {
  var imgEl = $(".bigimg").children();
  imgEl.attr("src", imageSrc).on("load", function () {
    applyLandscapeScale(imgEl);
  });
  if (imgEl[0].complete) applyLandscapeScale(imgEl);
  $(".modal").css("display", "flex").hide().fadeIn();
  $("body,html").css("overflow-y", "hidden");
}

function showGalleryImageAt(index) {
  const imageList = getCurrentGalleryList();
  if (!imageList.length) {
    return;
  }

  const normalizedIndex =
    (index + imageList.length) % imageList.length;
  currentShootingIndex = normalizedIndex;
  var imgEl = $(".bigimg").children();
  imgEl.attr("src", imageList[currentShootingIndex]).off("load").on("load", function () {
    applyLandscapeScale(imgEl);
  });
  if (imgEl[0].complete) applyLandscapeScale(imgEl);

  if ($(".modal").is(":hidden")) {
    $(".modal").css("display", "flex");
    $("body,html").css("overflow-y", "hidden");
  }
}

$(".main-wrapper ul li a").click(function () {
  // data-modal-img属性があればそれを使用、なければ元の画像を使用
  const modalImgSrc = $(this).data("modal-img");

  if (modalImgSrc && $(this).closest(".shooting-works-list").length) {
    currentGalleryType = "shooting";
    currentShootingIndex = shootingImageList.indexOf(modalImgSrc);
    showGalleryImageAt(currentShootingIndex);
    return false;
  }

  if (modalImgSrc && $(this).closest(".draw-works-list").length) {
    currentGalleryType = "draw";
    currentShootingIndex = drawImageList.indexOf(modalImgSrc);
    showGalleryImageAt(currentShootingIndex);
    return false;
  }

  currentGalleryType = null;
  const imgSrc = modalImgSrc ? modalImgSrc : $(this).children().attr("src");
  showModalImage(imgSrc);
  return false;
});

$(".modal-prev").click(function (event) {
  event.stopPropagation();
  showGalleryImageAt(currentShootingIndex - 1);
});

$(".modal-next").click(function (event) {
  event.stopPropagation();
  showGalleryImageAt(currentShootingIndex + 1);
});

$(".modal").click(function () {
  $(".modal").fadeOut();
  $("body,html").css("overflow-y", "visible");
  return false;
});
