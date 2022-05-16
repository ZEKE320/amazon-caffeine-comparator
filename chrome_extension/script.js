const showASIN = function() {
  alert("ボタン押下");
  $(".prodDetails .productDetails_db_sections tr:first").each(function () {
    let tr = $(this);
    let td1 = tr.children('td:first');
    if (td1.text() == "ASIN") {
      let td2 = tr.children('td:nth-child(2)');
      let asin = td2.text();
      alert(asin);
      console.log(asin);
    }
  });
}
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    function: showASIN
  });
});