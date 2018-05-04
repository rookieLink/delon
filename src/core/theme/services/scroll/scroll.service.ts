import { Injectable, Inject } from '@angular/core';
import { DOCUMENT, PlatformLocation } from '@angular/common';
import { fromEvent } from 'rxjs/observable/fromEvent';

export const topMargin = 16;

@Injectable()
export class ScrollService {

  private _topOffset: number | null;
  private _topOfPageElement: Element;

  get topOffset() {
    if (!this._topOffset) {
        const toolbar = this.doc.querySelector('.header');
        // 这个属性是只读属性，对于没有定义CSS或者内联布局盒子的元素为0，
        // 同时它是元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距。
        // clientHeight 可以通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算.
        this._topOffset = (toolbar && toolbar.clientHeight || 0) + topMargin;
    }
    return this._topOffset;
  }

  get topOfPageElement() {
    if (!this._topOfPageElement) {
      this._topOfPageElement = this.doc.getElementById('top-of-page') || this.doc.body;
    }
    return this._topOfPageElement;
  }

  constructor( @Inject(DOCUMENT) private doc: any, private location: PlatformLocation) {
    fromEvent(window, 'resize').subscribe(() => this._topOffset = null);
  }

  scroll() {
    const hash = this.getCurrentHash();
    const element: HTMLElement = hash ? this.doc.getElementById(hash) : this.topOfPageElement;
    this.scrollToElement(element);
  }

  scrollToElement(element: Element) {
    if (element) {
      element.scrollIntoView();

      if (window && window.scrollBy) {
        window.scrollBy(0, element.getBoundingClientRect().top - this.topOffset);

        if (window.pageYOffset < 20) {
          window.scrollBy(0, -window.pageYOffset);
        }
      }
    }
  }

  scrollToTop() {
    this.scrollToElement(this.topOfPageElement);
  }

  private getCurrentHash() {
    return this.location.hash.replace(/^#/, '');
  }
}
