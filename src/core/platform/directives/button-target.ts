import {
    Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef
} from '@angular/core';
import { MenuService } from '@delon/theme';

/**
 * @stable
 */
export class NgButtonTargetContext {
    public $implicit: any = null;
    public show: any = null;
}

@Directive({selector: '[buttonTarget]'})
export class ButtonTargetDirective {
    private _context: NgButtonTargetContext = new NgButtonTargetContext();
    private _templateRef: TemplateRef<NgButtonTargetContext> | null = null;
    private _contentViewRef: EmbeddedViewRef<NgButtonTargetContext> | null = null;

    constructor(private _viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<NgButtonTargetContext>,
                private _menuService: MenuService) {
        this._templateRef = templateRef;
    }

    private _buttonTarget: string;

    @Input('buttonTarget')
    set buttonTarget(condition: any) {
        this._context.$implicit =
            this._context.show =
                this._menuService.hasPermission(this._buttonTarget = condition);
        this._updateView();
    }

    private _updateView() {
        if (this._context.$implicit) {
            if (!this._contentViewRef) {
                this._viewContainer.clear();
                if (this._templateRef) {
                    this._contentViewRef =
                        this._viewContainer.createEmbeddedView(this._templateRef, this._context);
                }
            }
        } else {
            if (this._contentViewRef) {
                this._viewContainer.clear();
                this._contentViewRef = null;
            }
        }
    }

}


