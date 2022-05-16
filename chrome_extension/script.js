const showBestDrink = $(function () {
  let efficiency = 0;
  let caffeineIdx = -1;
  let reasonability = -1;
  let reasonableIdx = -1;
  const rbCaffeine = 0.32; // レッドブル1mlあたりのカフェイン量(mg)
  $('.slots-hidden').each(function (idx) {
    const prodPattern = $(this).find('img').attr('alt');
    const splitPattern = prodPattern.replace(/\d[)]/g, '').replace(/[^0-9×x+]/g, '').split(/[×x+]/g);

    let total = 0;

    let i = 0;
    while (i < splitPattern.length) {
      total += parseInt(splitPattern[i]) * parseInt(splitPattern[i + 1]);
      i += 2;
    }

    const price = $(this).find('.twisterSwatchPrice').text().replace(/([,\￥])/g, '');
    const newReasonability = Math.round((total / price) * 1000) / 1000;
    const newEfficiency = Math.round(((rbCaffeine * total) / price) * 1000) / 1000; // カフェイン摂取効率(mg/円)

    /** カフェイン接種効率が最大のパターンのidxを保持 */
    if (newEfficiency > efficiency && newEfficiency != Infinity) {
      efficiency = newEfficiency;
      caffeineIdx = idx;
    }

    if (newReasonability > reasonability && newReasonability != Infinity) {
      reasonability = newReasonability;
    }

    if (newEfficiency != (Infinity || NaN) && newReasonability != (Infinity || NaN)) {
      $(this).find('span.a-button-text').append('<div>' + newEfficiency.toPrecision(3) + ' mg/円</div>'); // 摂取効率参考値をページに表示（有効数字3ケタ）
      $(this).find('span.a-button-text').append('<div>' + newReasonability.toPrecision(3) + ' ml/円</div>'); // コスパ参考値をページに表示（有効数字3ケタ）
    } else {
      $(this).find('span.a-button-text').append('<div>計算エラー</div>');
    }
  });

  /** カフェイン摂取効率の高いパターンをハイライト（試験的機能） */
  if (caffeineIdx != -1) {
    $('li.slots-hidden:eq(' + (caffeineIdx) + ')').find('.a-button-inner').css('background-color', 'orange');
  }
})