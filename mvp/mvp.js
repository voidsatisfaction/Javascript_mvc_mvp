class Bookmark {
  constructor (opts) {
    this.url = opts.url;
    this.created = opts.created;
  }

  getRelativeTime() {
    return moment(this.created).fromNow();
  }
}

class BookmarkView {
  constructor ($bookmarkList) {
    this.$bookmarkList = $bookmarkList;
    this.$bookmarkInput = document.querySelector('.bookmark-input');
    this.$bookmarkButton = document.querySelector('.bookmark-button');

    this.$bookmarkButton.addEventListener('click', () => {
      const url = this.$bookmarkInput.value;
      const addNewBookmarkEvent = new CustomEvent('addNewBookmark', { detail: { url: url } });
      console.log(addNewBookmarkEvent);
      document.dispatchEvent(addNewBookmarkEvent);
    });
  }

  render (bookmarks) {
    console.log(bookmarks);
    this.$bookmarkList.innerHTML = '';
    bookmarks.forEach((bookmark) => {
      const $bookmark = this._bookmarkElement(bookmark.url);
      this.$bookmarkList.appendChild($bookmark);
    });
  }

  _bookmarkElement(url) {
    const $list = document.createElement('li');
    const $textNode = document.createTextNode(url);
    $list.appendChild($textNode);

    return $list;
  }
}

class BookmarkPresenter {
  constructor ($element) {
    this.bookmarks = [];
    this.view = new BookmarkView($element);
    document.addEventListener('addNewBookmark', (e) => {
      this.addNewBookmark(e.detail.url);
    })
  }

  addNewBookmark(url) {
    const bookmark = new Bookmark({
      url: url,
      created: new Date(),
    });
    this.bookmarks.push(bookmark);
    this.view.render(this.bookmarks);
  }
}

(function() {
  const presenter = new BookmarkPresenter(document.querySelector('.bookmark-list'));
})();
