import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit, Type,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {omit} from 'lodash';
import {loadRemoteModule} from '@angular-architects/module-federation';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ILoadComponentConfiguration} from "./interfaces/configuration.interface";

@Component({
  selector: 'mfe-sideload',
  template: `
    <ng-template #container></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideloadComponent implements OnInit, AfterContentInit, OnDestroy {
  private static readonly REGISTRY: Map<string, Promise<any>> = new Map<string, Promise<any>>();

  @Input()
  props: Record<string, any>;

  @Input()
  events: Record<string, (...args: any[]) => void>;

  @Input()
  configuration: ILoadComponentConfiguration;

  @ViewChild('container', {read: ViewContainerRef, static: true})
  private container: ViewContainerRef;
  private eventsMap: Map<string, (...args: any) => void> = new Map<string, (...args: any) => void>();
  private element: Element;
  private load$: Promise<any>;
  private routerSnapshot: ActivatedRouteSnapshot
  private componentInstance: ComponentRef<any>;
  private destroyer$: Subject<void> = new Subject<void>();

  constructor(
    route: ActivatedRoute,
    private resolver: ComponentFactoryResolver
  ) {
    this.routerSnapshot = route.snapshot;
  }


  ngOnInit(): void {
    if (this.routerSnapshot.data.remoteEntry) {
      this.props = this.routerSnapshot.data.props;
      this.events = this.routerSnapshot.data.events;
      this.configuration = omit(this.routerSnapshot.data, ['props', 'events']) as ILoadComponentConfiguration;
    }

    if(SideloadComponent.REGISTRY.has(this.configuration.remoteEntry)){
      this.load$ = SideloadComponent.REGISTRY.get(this.configuration.remoteEntry) as any;
    }else {
      this.load$ = loadRemoteModule(this.configuration)
        .then(async (content: any) => {
          console.log(`element ${this.configuration.elementName || this.configuration.componentName} loaded!`);
          return content;
        })
        .catch(err => {
          console.error(`error loading ${this.configuration.elementName || this.configuration.componentName}:`, err)
          throw err;
        });
      SideloadComponent.REGISTRY.set(this.configuration.remoteEntry, this.load$)
    }
  }

  ngAfterContentInit() {
    this.initElement()
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
    Array.from(this.eventsMap.entries()).forEach(item => {
      this.element.removeEventListener(item[0], item[1]);
    });
  }

  private async initElement(){
    const loadedModule: any = await this.load$;
    if (!loadedModule) {
      return;
    }
    this.container.clear()
    if (!this.configuration.componentName) {
      this.initWebComponent();
    } else {
      this.initNgComponent(
        loadedModule[this.configuration.componentName]
      );
    }
  }

  private async initNgComponent(component: Type<unknown>) {
    const componentCreator = this.resolver.resolveComponentFactory(component)
    if (componentCreator) {
      try {
        this.componentInstance = this.container.createComponent(componentCreator,
          // 0,
          // this.injector,
          // [[]],
          // compilationRslt.ngModuleFactory.create(this.injector)
        );
      } catch (e){
        console.error(e);
      }
      this.setAngularComponentProps(this.props);
      this.setAngularComponentEvents(this.events);
      this.componentInstance.changeDetectorRef.markForCheck();
      this.componentInstance.changeDetectorRef.detectChanges();
    }
  }

  private initWebComponent() {
    this.element = document.createElement(this.configuration.elementName as string);
    this.setProps();
    this.setEvents();
    this.container.element.nativeElement.appendChild(this.element);
  }

  private setProps() {
    if (this.props) {
      Object.entries(this.props).forEach(item => this.element.setAttribute(item[0], item[1]));
    }
  }

  private setEvents() {
    if (this.events) {
      Object.entries(this.events).forEach(item => {
        this.element.addEventListener(item[0], item[1]);
        this.eventsMap.set(item[0], item[1]);
      });
    }
  }

  private setAngularComponentEvents(events: Record<string, (...args: any[]) => void>) {
    if (events) {
      Object.entries(events).map(item => this.componentInstance.instance?.[item[0]]?.pipe(takeUntil(this.destroyer$)).subscribe(() => item[1]()));
    }
  }


  private setAngularComponentProps(props: Record<string, any>) {
    if (props) {
      Object.entries(props).forEach(item => this.componentInstance.instance[item[0]] = item[1]);
    }
  }
}
