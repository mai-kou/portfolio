const shootingImageList = $(".shooting-works-list a[data-modal-img]")
  .map(function () {
    return $(this).data("modal-img");
  })
  .get();

let currentShootingIndex = -1;

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

function showShootingImageAt(index) {
  if (!shootingImageList.length) {
    return;
  }

  const normalizedIndex =
    (index + shootingImageList.length) % shootingImageList.length;
  currentShootingIndex = normalizedIndex;
  var imgEl = $(".bigimg").children();
  imgEl.attr("src", shootingImageList[currentShootingIndex]).off("load").on("load", function () {
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
    currentShootingIndex = shootingImageList.indexOf(modalImgSrc);
    showShootingImageAt(currentShootingIndex);
    return false;
  }

  const imgSrc = modalImgSrc ? modalImgSrc : $(this).children().attr("src");
  showModalImage(imgSrc);
  return false;
});

$(".modal-prev").click(function (event) {
  event.stopPropagation();
  showShootingImageAt(currentShootingIndex - 1);
});

$(".modal-next").click(function (event) {
  event.stopPropagation();
  showShootingImageAt(currentShootingIndex + 1);
});

$(".modal").click(function () {
  $(".modal").fadeOut();
  $("body,html").css("overflow-y", "visible");
  return false;
});
