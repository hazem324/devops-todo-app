import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast } from '../../../../model/toast.model';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls:   ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {

  toast:    Toast | null = null;
  visible = false;

  private sub!:   Subscription;
  private timer:  ReturnType<typeof setTimeout> | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.sub = this.toastService.toast$.subscribe(toast => {
      this.toast   = toast;
      this.visible = true;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => (this.visible = false), 3000);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.timer) clearTimeout(this.timer);
  }
}
