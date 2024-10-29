import { Component, Input } from '@angular/core';
import { UserType } from '../../../types/user.type';

@Component({
  selector: 'app-user-row',
  standalone: true,
  imports: [],
  templateUrl: './user-row.component.html',
  styleUrl: './user-row.component.scss'
})
export class UserRowComponent {
  @Input() public user!: UserType;
}
