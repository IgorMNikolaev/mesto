export default class Section {
  constructor({items, renderer }, ElementSelector) {
  this._items = items;
  this.renderer = renderer;
  this._container = document.querySelector(ElementSelector);
  }

  render() {
    this._items.forEach(info => {
      this.renderer(info);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  addNewcard(element) {
    this._container.prepend(element);
  }
}
