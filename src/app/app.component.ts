import { Component, ViewChild, ViewContainerRef, Compiler, OnInit, NgModule } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <h1>Dynamic template:</h1>
    <div #container></div>`
})
export class AppComponent implements OnInit {
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    private template = `<p>This is compiled injected content: {{1 + 1}}<p>`;

    constructor(private compiler: Compiler) {
    }

    ngOnInit() {
        this.addComponent(this.template);
    }

    private addComponent(template: string) {
        @Component({template: template})
        class TemplateComponent {
        }

        @NgModule({declarations: [TemplateComponent]})
        class TemplateModule {
        }

        const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
        const factory = mod.componentFactories.find((comp) =>
            comp.componentType === TemplateComponent
        );
        const component = this.container.createComponent(factory);
    }
}
