import {store} from '../'
import {IArtworkViewDto} from "../../api/artworkApi";

export function StoreArtworksAction(artworks: IArtworkViewDto[]) {
  store.dispatch({type: 'STORE_ARTWORKS', payload: artworks})
}
