
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button'
import { ToolbarModule } from 'primeng/toolbar'
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

const PRIME_MODULES = [
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    CardModule,
    TooltipModule,
    ToastModule,
    DropdownModule,
    ConfirmPopupModule
]

@NgModule({
    imports: PRIME_MODULES,
    exports: PRIME_MODULES
})

export class PrimeNGModule { }