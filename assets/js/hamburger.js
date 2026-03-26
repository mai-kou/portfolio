//   $(function() {
//     $('.l-hamburger').click(function() {
//         $(this).toggleClass('active');
 
//         if ($(this).hasClass('active')) {
//             $('.globalMenu').addClass('active');
//         } else {
//             $('.globalMenu').removeClass('active');
//         }
//     });
// });

// 'hamburger.html'の中身を丸ごと取ってくる
fetch('hamburger.html')
  .then(response => {
    // ちゃんと取れたか確認
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // 取ってきた中身をテキストとして返す
    return response.text();
  })
  .then(data => {
    // 'menu-placeholder'というidを持つ要素に、
    // 取ってきたテキスト（HTML）を丸ごと流し込む
    document.getElementById('menu-placeholder').innerHTML = data;
  })
  .catch(error => {
    // もしファイルが見つからなかったりしたら、エラーを出す
    console.error('There has been a problem with your fetch operation:', error);
  });

  // ↓ 2. サイドバーを読み込むコード（これを新しく追記する）
fetch('sidebar.html') // ★ファイル名を変更
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.text();
  })
  .then(data => {
    document.getElementById('sidebar-placeholder').innerHTML = data; // ★IDを変更
  })
  .catch(error => console.error('Error loading sidebar:', error));

const sidebarClickAudio = new Audio('assets/sounds/hover.mp3');
sidebarClickAudio.preload = 'auto';
sidebarClickAudio.volume = 0.3;

window.playSidebarAndGo = function (event, linkElement) {
  if (!linkElement) {
    return true;
  }

  const href = linkElement.getAttribute('href');
  if (!href) {
    return true;
  }

  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return true;
  }

  event.preventDefault();

  sidebarClickAudio.currentTime = 0;
  sidebarClickAudio.play().catch(() => {});

  setTimeout(() => {
    if (linkElement.target === '_blank') {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    window.location.href = href;
  }, 200);

  return false;
};

document.addEventListener('click', (event) => {
  // ハンバーガーボタンのトグル
  const hamburgerBtn = event.target.closest('#hamburger-btn');
  if (hamburgerBtn) {
    hamburgerBtn.classList.toggle('is-active');
    const nav = document.querySelector('.l-sidebar .l-sidebar__nav');
    if (nav) nav.classList.toggle('is-open');
    return;
  }

  // サイドバーリンクのクリック
  const sidebarLink = event.target.closest(
    '#sidebar-inner .l-sidebar-menu a, #sidebar-outer .l-sidebar-menu a, .l-sidebar .l-sidebar-menu a'
  );

  if (!sidebarLink) {
    return;
  }

  // メニューを閉じてから遷移
  const btn = document.querySelector('#hamburger-btn');
  const nav = document.querySelector('.l-sidebar .l-sidebar__nav');
  if (btn) btn.classList.remove('is-active');
  if (nav) nav.classList.remove('is-open');

  window.playSidebarAndGo(event, sidebarLink);
});