export default class Section {
  constructor({ items, renderer }, ElementSelector) {
  this._elements = items;
  this.renderer = renderer;
  this._container = document.querySelector(ElementSelector);
  }

  render() {
    this._elements.forEach(element => {
      this.renderer(element);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  addNewcard(element) {
    this._container.prepend(element);
  }
}
