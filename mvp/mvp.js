(function() {
  const $bookmarkList = document.querySelector('.bookmark-list');

  const $bookmarkInput = document.querySelector('.bookmark-input');
  const $bookmarkButton = document.querySelector('.bookmark-button');

  $bookmarkButton.addEventListener('click', () => {
    const $bookmark = bookmarkElement($bookmarkInput.value);
    $bookmarkList.appendChild($bookmark);
  });
})();

function bookmarkElement(bookmark) {
  const $list = document.createElement('li');
  const $textNode = document.createTextNode(bookmark);
  $list.appendChild($textNode);

  return $list;
}
