const showASIN = $(function () {
  // const category = $('#nav-subnav .nav-a-content').eq(0).text()
  // alert('script.js実行！\nカテゴリー：' + category);

  let cp = 0;
  let prodIdx = -1;
  const rbCaffeine = 32;
  $('.slots-hidden').each(function (idx) {
    const prodPattern = $(this).find('img').attr('alt');
    const splitPattern = prodPattern.replace(/[^0-9,x]/g, '').split('x', 2);

    console.log(prodPattern);
    console.log(splitPattern);

    const volume = parseInt(splitPattern[0]);
    const quantity = parseInt(splitPattern[1]);

    console.log(volume);
    console.log(quantity);

    const price = $(this).find('.twisterSwatchPrice').text().replace(/([,\￥])/g, '');
    const newCp = Math.round((rbCaffeine * volume * quantity) / price, 1);

    console.log(price);
    console.log(newCp);
    if (newCp > cp) {
      prodIdx = idx;
    }
    $(this).find('span.a-button-text').append('<div>' + newCp + ' mg/円</div>')
  });

  if (prodIdx != -1) {
    $('li.slots-hidden:eq(' + (prodIdx - 2) + ')').find('.a-button-inner').css('background-color', 'orange');
  }

  console.log(prodIdx);
})