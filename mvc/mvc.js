class Bookmark {
  constructor(opt) {
    this.url = opt.url;
    this.created = new Date();
  }
}

class Bookmarks {
  constructor() {
    this.bookmarks = [];
  }

  push(bookmark) {
    this.bookmarks.push(bookmark);
    const bookmarkAdded = new CustomEvent('bookmarkAdded');
    document.dispatchEvent(bookmarkAdded);
  }

  forEach(callback) {
    this.bookmarks.forEach(callback);
  }
}

class BookmarkView {
  constructor($bookmarkList, bookmarks) {
    this.$bookmarkList = $bookmarkList;

    this.$bookmarkInput = document.querySelector('.bookmark-input');
    this.$bookmarkButton = document.querySelector('.bookmark-button');

    this.bookmarks = bookmarks;

    this.$bookmarkButton.addEventListener('click', () => {
      const url = this.$bookmarkInput.value;
      const addNewBookmark = new CustomEvent('addNewBookmark', { detail: { url: url } });
      document.dispatchEvent(addNewBookmark);
    });

    document.addEventListener('bookmarkAdded', () => {
      this.render();
    });
  }

  _bookmarkElement(url) {
    const $list = document.createElement('li');
    const $textNode = document.createTextNode(url);
    $list.appendChild($textNode);

    return $list;
  }

  render() {
    this.$bookmarkList.innerHTML = '';
    this.bookmarks.forEach((bookmark) => {
      const $bookmark = this._bookmarkElement(bookmark.url);
      this.$bookmarkList.appendChild($bookmark);
    });
  }
}

class BookmarkController {
  constructor($element) {
    this.bookmarks = new Bookmarks();
    this.view = new BookmarkView($element, this.bookmarks);

    document.addEventListener('addNewBookmark', (e) => {
      const url = e.detail.url;
      this.addNewBookmark(url);
    });
  }

  addNewBookmark(url) {
    const bookmark = new Bookmark({ url });
    this.bookmarks.push(bookmark);
  }
}

(function() {
  const bookmarkController = new BookmarkController(document.querySelector('.bookmark-list'));
})();
