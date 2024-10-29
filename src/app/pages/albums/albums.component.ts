import { Component, signal, Signal } from '@angular/core';
import { AlbumType } from '../../types/album.type';
import { AlbumsService } from '../../services/albums/albums.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store/store.service';
import { AlbumPhotoType } from '../../types/album-photo.type';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent {
  public albums: Signal<AlbumType[] | undefined> = signal([]);
  public isLoading: Signal<boolean> = signal(true);

  public albumsPhotos: AlbumPhotoType[] = [];
  public showAlbumPhotos: number[] = [];

  constructor(private readonly albumsService: AlbumsService, private readonly route: ActivatedRoute, private readonly storeService: StoreService) {
    if (this.route.snapshot.paramMap.get('id')) {
      const { data, isLoading } = this.albumsService.getUsersAlbums(+(this.route.snapshot?.paramMap?.get('id') as string));
      this.isLoading = isLoading;
      this.albums = data;
    }
    this.storeService.getAlbumsPhotos.subscribe((albumsPhotos: AlbumPhotoType[]) => {
      this.albumsPhotos = [...albumsPhotos];
    });
  }

  public togglePhotos(albumId: number) {
    if (!this.showAlbumPhotos.includes(albumId)) {
      this.showAlbumPhotos = [...this.showAlbumPhotos, albumId];
    } else {
      this.showAlbumPhotos = [...(this.showAlbumPhotos.filter(id => id !== albumId))];
    }
    // check if we have the albums photos
    if (this.albumsPhotos.find(album => album.albumId === albumId) === undefined) {
      // we don't have album photos, need to call API
      this.albumsService.getAlbumPhotos(albumId).then((albumsPhotos: AlbumPhotoType[]) => {
        this.storeService.addAlbumsPhotos.next(albumsPhotos);
      });
    }
  }
}
