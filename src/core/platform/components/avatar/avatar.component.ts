import { Component, ViewEncapsulation, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

export type NzAvatarShape = 'square' | 'circle';
export type NzAvatarSize = 'small' | 'large' | 'default';

@Component({
    selector: 'avatar',
    template: `
        <span class="{{icon}}" *ngIf="icon && _hasIcon"></span>
        <img [src]="imageSrc" *ngIf="imageSrc && _isSrcExist" (error)="_imgError($event)"/>
        <span class="ant-avatar-string" #textElement [ngStyle]="_textStyles" *ngIf="text && _hasText">{{text}}</span>
    `,
    styleUrls: [
        './avatar.component.less'
    ]
})
export class AvatarComponent implements OnChanges {

    private $host: JQuery;
    private _prefixCls = 'avatar';
    private _classList: string[] = [];
    private _sizeMap = {large: 'lg', small: 'sm'};

    _hasText: boolean = false;
    @ViewChild('textElement') _textElement: ElementRef;
    _textStyles: {};

    _isSrcExist: boolean = true;

    _hasIcon: boolean = false;

    @Input() shape: NzAvatarShape = 'circle';

    @Input() size: NzAvatarSize = 'default';

    @Input() text: string;

    @Input() imageSrc: string;

    @Input() icon: string;

    _setClassMap() {
        this.$host.removeClass(this._classList.join(' '));
        this._classList = [
            this._sizeMap[this.size] && `${this._prefixCls}-${this._sizeMap[this.size]}`,
            this.shape && `${this._prefixCls}-${this.shape}`,
            this.icon && `${this._prefixCls}-icon`,
            this.imageSrc && `${this._prefixCls}-image`
        ].filter((item) => {
            return !!item;
        });
        this.$host.addClass(this._classList.join(' '));
        return this;
    }

    _imgError() {
        this._isSrcExist = false;
        // TODO(i): need force remove [nzSrc] if broken image?
        this._hasIcon = false;
        this._hasText = false;
        if (this.icon) {
            this._hasIcon = true;
        } else if (this.text) {
            this._hasText = true;
        }
        this._setClassMap()._notifyCalc();
    }

    private _calcStringSize() {
        if (!this._hasText) return;

        const el = this._textElement && this._textElement.nativeElement;
        if (!el) return;

        const childrenWidth = el.offsetWidth;
        const avatarWidth = this.$host[0].getBoundingClientRect().width;
        const scale = avatarWidth - 8 < childrenWidth ? (avatarWidth - 8) / childrenWidth : 1;
        if (scale === 1) {
            this._textStyles = {};
        } else {
            this._textStyles = {
                transform: `scale(${scale})`,
                position: 'absolute',
                display: 'inline-block',
                left: `calc(50% - ${Math.round(childrenWidth / 2)}px)`
            };
        }
    }

    private _notifyCalc() {
        // If use ngAfterViewChecked, always demands more computations, so......
        setTimeout(() => {
            this._calcStringSize();
        });
        return this;
    }

    constructor(private _elementRef: ElementRef) {
        this.$host = $(_elementRef.nativeElement).addClass(this._prefixCls);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._hasText = !this.imageSrc && !!this.text;
        this._hasIcon = !this.imageSrc && !!this.icon;

        this._setClassMap()._notifyCalc();
    }

}
