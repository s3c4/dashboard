import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserType } from '../../types/user.type';

const API = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  public getUsers = () => {
    return lastValueFrom(
      this.http.get<UserType[]>(API + '/users'),
    )
  }
}
