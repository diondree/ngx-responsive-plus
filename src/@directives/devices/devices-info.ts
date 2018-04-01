import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { ResponsiveState } from '../../@core';
import { distinctUntilChanged } from 'rxjs/operators';
export abstract class DevicesInfo {
    public currentstate: string;
    public _subscription: Subscription;
    public subject$: Subject<any> = new Subject();
    public replaySubject$: ReplaySubject<any> = new ReplaySubject();
    constructor(protected _responsiveState: ResponsiveState) { }
    public connect() {
        this._subscription = this._responsiveState.device$.pipe(distinctUntilChanged())
        .subscribe((data) => {
            console.log('this._responsiveState.device$ ===>', data);
            this._updateData(data);
        });
    }
    public disconnect() {
        this._subscription.unsubscribe();
    }
    protected _updateData(value: any) {
        this.subject$.next(value);
        this.replaySubject$.next(value);
    }
}