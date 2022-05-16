const showBestDrink = $(function () {
  let cp = 0;
  let recommendIdx = -1;
  const rbCaffeine = 0.32; // 1mlあたりのカフェイン量(mg)
  $('.slots-hidden').each(function (idx) {
    const prodPattern = $(this).find('img').attr('alt');
    const splitPattern = prodPattern.replace(/[^0-9x]/g, '').split(/[×x]/, 2);

    const capacity = parseInt(splitPattern[0]);
    const quantity = parseInt(splitPattern[1]);

    const price = $(this).find('.twisterSwatchPrice').text().replace(/([,\￥])/g, '');
    const newCp = Math.round(((rbCaffeine * capacity * quantity) / price) * 1000) / 1000; // カフェイン摂取効率(mg/円)

    /** カフェイン接種効率が最大のパターンのidxを保持 */
    if (newCp > cp) {
      cp = newCp;
      recommendIdx = idx;
    }

    $(this).find('span.a-button-text').append('<div>' + newCp.toPrecision(3) + ' mg/円</div>'); // 摂取効率参考値をページに表示（有効数字3ケタ）
  });

  /** カフェイン摂取効率の高いパターンをハイライト */
  if (recommendIdx != -1) {
    $('li.slots-hidden:eq(' + (recommendIdx) + ')').find('.a-button-inner').css('background-color', 'orange');
  }
})