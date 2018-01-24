import {
    Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef
} from '@angular/core';
import { MenuService } from '@delon/theme';

/**
 * @stable
 */
export class NgMenuTargetContext {
    public $implicit: any = null;
    public show: any = null;
}

@Directive({selector: '[menuTarget]'})
export class MenuTargetDirective {
    private _context: NgMenuTargetContext = new NgMenuTargetContext();
    private _templateRef: TemplateRef<NgMenuTargetContext> | null = null;
    private _contentViewRef: EmbeddedViewRef<NgMenuTargetContext> | null = null;

    constructor(private _viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<NgMenuTargetContext>,
                private _menuService: MenuService) {
        this._templateRef = templateRef;
    }

    private _menuTarget: string;

    @Input('menuTarget')
    set menuTarget(condition: any) {
        this._context.$implicit =
            this._context.show =
                this._menuService.hasPermission(this._menuTarget = condition);
        this._updateView();
    }

    private _updateView() {
        if (this._context.$implicit) {
            if (!this._contentViewRef) {
                this._viewContainer.clear();
                if (this._templateRef) {
                    this._contentViewRef =
                        this._viewContainer.createEmbeddedView(this._templateRef, this._context);
                    const $element = $(this._contentViewRef.rootNodes[0]);
                    $element.data('menuTarget', this._menuTarget);
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


