import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FeedStore } from 'src/modules/feed/feed.store';
import { RoomType } from '../../room.model';
import { RoomService } from '../../services/room.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export class CreateRoomFormModel {
  name: string = "";
  type: RoomType = RoomType.Text;
}

@Component({
  selector: 'app-room-create-modal',
  templateUrl: './room-create-modal.component.html',
  styleUrls: ['./room-create-modal.component.less']
})
export class RoomCreateModalComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;
  roomId$: Observable<string | undefined>;
  isVisible: boolean = false;
  model = new CreateRoomFormModel();

  constructor(private roomService: RoomService, private feedStore: FeedStore, private router: Router,) {
    this.roomId$ = feedStore.roomId$;
    this.router = router;
  }

  ngOnInit(): void {
  }

  async onOk() {
    if (this.form.form.valid) {
      // TODO invoquer la méthode create du RoomService
      this.roomService.create(this.model.name, this.model.type);
      this.router.navigate(['app/default']);
      this.close();
    }
  }

  onCancel() {
    this.close();
  }

  open() {
    this.isVisible = true;
    setTimeout(() => this.form.resetForm(new CreateRoomFormModel()))
  }

  close() {
    this.isVisible = false;
  }
}
