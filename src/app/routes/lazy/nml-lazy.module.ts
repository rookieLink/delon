import {NgModule} from '@angular/core';
import {NMLAComponent} from './a.component';

@NgModule({
    declarations: [NMLAComponent],
    entryComponents: [NMLAComponent]
})

export class NMLLazyModule {

    paths = {
        'aComponent': NMLAComponent
    };

}
