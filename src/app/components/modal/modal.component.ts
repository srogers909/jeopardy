import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from 'src/app/interfaces';
import { CoreModule } from 'src/app/services/core.module';

@Component({
  selector: 'modal',
  imports: [
    CommonModule,
    CoreModule
  ],
  standalone: true,
  template: `
    <ng-template #modal>      
      <div class="modal-body">
        <ng-content></ng-content>
      </div>
      <div class="modal-footer">
        <button type="button"
                class="btn btn-outline-secondary"
                (click)="dismiss()"
                *ngIf="modalConfig.hideDismissButton === undefined || !modalConfig.hideDismissButton()"
                [disabled]="modalConfig.disableDismissButton !== undefined && modalConfig.disableDismissButton()">
          {{ modalConfig.dismissButtonLabel }}
        </button>
        <button type="button"
                class="btn btn-outline-primary"
                (click)="close()"
                *ngIf="modalConfig.hideCloseButton === undefined || !modalConfig.hideCloseButton()"
                [disabled]="modalConfig.disableCloseButton !== undefined && modalConfig.disableCloseButton()">
          {{ modalConfig.closeButtonLabel }}
        </button>
      </div>
    </ng-template>
  `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>
  private modalRef: NgbModalRef

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent)
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }
}
