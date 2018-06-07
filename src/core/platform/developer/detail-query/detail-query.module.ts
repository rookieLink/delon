import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {DetailQueryComponent} from "./detail-query.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        DetailQueryComponent
    ],
    exports: [
        DetailQueryComponent
    ]
})
export class DetailQueryModule {

}
