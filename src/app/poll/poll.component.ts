import { Component, inject } from '@angular/core';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.scss',
})
export class PollComponent {
  pollService = inject(PollService);
}
