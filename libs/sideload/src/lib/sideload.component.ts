import {
  AfterContentInit,
  ChangeDetectionStrategy, Compiler,
  Component, ComponentFactoryResolver, ComponentRef,
  ElementRef, Injector, Input,
  OnDestroy,
  OnInit,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {omit} from 'lodash';
import {loadRemoteModule} from '@angular-architects/module-federation';
import {LoadRemoteModuleOptions} from "@angular-architects/module-federation-runtime/lib/loader/dynamic-federation";

@Component({
  selector: 'mfe-sideload',
  template: `
    <div #vc></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideloadComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input()
  props: Record<string, any>;

  @Input()
  events: Record<string, (...args: any[]) => void>;

  @Input()
  item: any;

  @Input()
  isWebComponent: boolean = true;

  @ViewChild('vc', {read: ViewContainerRef, static: true})
  private vc: ViewContainerRef;
  private eventsMap: Map<string, (...args: any) => void> = new Map<string, (...args: any) => void>();
  private element: Element;
  private load$: Promise<void>;
  private routerSnapshot: ActivatedRouteSnapshot
  private componentInstance: ComponentRef<any>;

  constructor(
    route: ActivatedRoute,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private compiler: Compiler,
  ) {
    this.routerSnapshot = route.snapshot;
  }



  ngOnInit(): void {
    if(this.routerSnapshot.data.remoteEntry){
      this.props = this.routerSnapshot.data.props;
      this.events = this.routerSnapshot.data.events;
      this.isWebComponent = this.routerSnapshot.data.isWebComponent;
      this.item = omit(this.routerSnapshot.data, ['props', 'events']) as any;
    }

    this.load$ = loadRemoteModule(this.item)
      .then(async (content: any) => {
        console.log(`element ${this.item.elementName} loaded!`);
        return content;

      })
      .catch(err => {
        console.error(`error loading ${this.item.elementName}:`, err)
        throw err;
      });
  }

  async ngAfterContentInit() {
    const loadedModule: any = await this.load$;
    if(!loadedModule){
      return;
    }
    if(this.isWebComponent) {
      this.element = document.createElement(this.item.elementName);
      this.setProps();
      this.setEvents();
      this.vc.element.nativeElement.appendChild(this.element);
    }else{
      const compilationRslt = await this.compiler.compileModuleSync(loadedModule[this.item.moduleName]);
      debugger;
      console.log('compilationRslt', compilationRslt)
      const componentToCreate = loadedModule[this.item.componentName];
      const componentCreator = this.resolver.resolveComponentFactory(componentToCreate)
      if(componentCreator) {
        this.componentInstance = this.vc.createComponent(componentCreator,
          undefined,
          this.injector,
          undefined,
          compilationRslt.create(this.injector));
        this.setAngularComponentProps(this.props);
        this.setAngularComponentEvents(this.events);
        this.componentInstance.changeDetectorRef.detectChanges();
      }
    }
  }

  ngOnDestroy(): void {
    Array.from(this.eventsMap.entries()).forEach(item => {
      this.element.removeEventListener(item[0], item[1]);
    });
  }

  private setProps(){
    if(this.props) {
      Object.entries(this.props).forEach(item => this.element.setAttribute(item[0], item[1]));
    }
  }

  private setEvents(){
    if(this.events) {
      Object.entries(this.events).forEach(item => {
        this.element.addEventListener(item[0], item[1]);
        this.eventsMap.set(item[0], item[1]);
      });
    }
  }

  private setAngularComponentEvents(events: Record<string, (...args: any[]) => void>) {
    if(events) {
      Object.entries(events).forEach(item => this.componentInstance.instance?.[item[0]]?.subscribe(() => item[1]()));
    }
  }


  private setAngularComponentProps(props: Record<string, any>) {
    if(props) {
      Object.entries(props).forEach(item => this.componentInstance.instance[item[0]] = item[1]);
    }
  }
}
