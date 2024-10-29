import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { AlbumType } from '../../types/album.type';
import { AlbumPhotoType } from '../../types/album-photo.type';

const API = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private readonly http: HttpClient) { }

  public getUsersAlbums = (userId: number) => {
    return injectQuery(() => ({
      queryKey: ['getUsersAlbums'],
      queryFn: () =>
        lastValueFrom(
          this.http.get<AlbumType[]>(API + '/users/' + userId + '/albums'),
        ),
      staleTime: 1000 * 60 * 60 // 1 hour
    }));
  }

  public getAlbumPhotos = (albumId: number) => {
    return lastValueFrom(
      this.http.get<AlbumPhotoType[]>(API + '/albums/' + albumId + '/photos')
    );
  };

}
