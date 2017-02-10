import { Component, ViewChild, ViewContainerRef, Compiler, OnInit, NgModule } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <h1>Dynamic template:</h1>
    <a routerLink="/stuff">normal link </a>
    <div #container></div>
    <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    private template = `
    <p>This is compiled injected content: {{1 + 1}}<p>
    <a routerLink="/stuff">injected link</a>
    <p>Provided number: {{val}}</p>
`;

    constructor(private compiler: Compiler) {
    }

    ngOnInit() {
        this.addComponent(this.template, 10);
    }

    private addComponent(template: string, num: number) {
        @Component({template: template})
        class TemplateComponent {
            val: number = 10;
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
