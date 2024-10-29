import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { UserRowComponent } from "../../components/user-row/user-row/user-row.component";
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users/users.service';
import { UserType } from '../../types/user.type';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UserRowComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {
  public users: UserType[] | undefined = [];
  public myForm: FormGroup;
  public allUsers: UserType[] | undefined = [];

  constructor(private readonly usersService: UsersService) {

    this.myForm = new FormGroup({
      search: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.usersService.getUsers().then((data) => {
      this.users = data;
      this.allUsers = data;
    });

    this.myForm.get('search')?.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(700)
    ).subscribe((value) => {
      this.users = [...this.allUsers?.filter((user) => user.name.toLowerCase().includes(value.toLowerCase())) || []];
    });
  }

}
