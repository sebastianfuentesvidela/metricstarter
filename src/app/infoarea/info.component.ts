import { Store, select } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, map } from 'rxjs/operators';

import { routeAnimations, TitleService } from '@app/core';
import { selectSettings, SettingsState } from '@app/settings';

import { State } from '../../examples/examples.state';
import { selectAuth } from '@app/core/auth/auth.selectors';

@Component({
  selector: 'anms-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  animations: [routeAnimations]
})
export class InfoComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private isAuthenticated$: Observable<boolean>;

  infos = [
    { link: 'itodos', label: 'anms.examples.menu.todos' },
    { link: 'istock-market', label: 'anms.examples.menu.stocks' },
    { link: 'itheming', label: 'anms.examples.menu.theming' },
    { link: 'iauthenticated', label: 'anms.examples.menu.auth', auth: true }
  ];
  techinfo = [
    { link: 'dashh', label: 'anms.settings.themes.blue' },
    { link: 'grafo', label: 'anms.settings.themes.light' },
    { link: 'dinamyc', label: 'anms.settings.themes.nature' },
    { link: 'aupanishads', label: 'anms.settings.themes' },
    { link: 'dialogs', label: 'anms.settings.animations' }
  ];

  constructor(
  //  private store: Store<State>,
    private router: Router,
    private titleService: TitleService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('es');
  //  this.subscribeToSettings();
    this.subscribeToRouterEvents();
    // this.isAuthenticated$ = this.store.pipe(
    //   select(selectAuth),
    //   map(auth => auth.isAuthenticated)
    // );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // private subscribeToSettings() {
  //   this.store
  //     .pipe(select(selectSettings), takeUntil(this.unsubscribe$))
  //     .subscribe((settings: SettingsState) =>
  //       this.translate.use(settings.language)
  //     );
  // }

  private subscribeToRouterEvents() {
    this.titleService.setTitle(
      this.router.routerState.snapshot.root,
      this.translate
    );
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: ActivationEnd) => event.snapshot),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(snapshot =>
        this.titleService.setTitle(snapshot, this.translate)
      );
  }
}
