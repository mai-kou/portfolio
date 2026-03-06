// Exhibition Modal
$(document).ready(function() {
  // exhibition-linkをクリックしたとき
  $('.exhibition-link').click(function(e) {
    e.preventDefault();
    
    // data-exhibition属性から対応する詳細IDを取得
    var exhibitionId = $(this).data('exhibition');
    
    // 該当するexhibition-detailの内容を取得
    var exhibitionContent = $('#' + exhibitionId).clone();
    
    // モーダルのボディに挿入
    $('.exhibition-modal-body').html(exhibitionContent);
    
    // モーダルを表示
    $('#exhibition-modal').fadeIn();
    
    // スクロールを無効化
    $('body,html').css('overflow', 'hidden');
  });
  
  // 閉じるボタンをクリックしたとき
  $('.exhibition-modal-close').click(function() {
    $('#exhibition-modal').fadeOut();
    $('body,html').css('overflow', 'visible');
  });
  
  // モーダルの外側をクリックしたとき
  $('#exhibition-modal').click(function(e) {
    if (e.target.id === 'exhibition-modal') {
      $(this).fadeOut();
      $('body,html').css('overflow', 'visible');
    }
  });
});
