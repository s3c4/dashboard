import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlbumPhotoType } from '../../types/album-photo.type';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private albumsPhotos: AlbumPhotoType[] = [];
  public addAlbumsPhotos = new BehaviorSubject<AlbumPhotoType[]>([]);
  public getAlbumsPhotos = new BehaviorSubject<AlbumPhotoType[]>(this.albumsPhotos);

  constructor() {
    this.addAlbumsPhotos.subscribe((newAlbumPhotos: AlbumPhotoType[]) => {
      this.albumsPhotos = [...this.albumsPhotos, ...newAlbumPhotos];
      this.getAlbumsPhotos.next([...this.albumsPhotos, ...newAlbumPhotos]);
    });
  }

}
