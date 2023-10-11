import { store } from "../";
import { IArtworkViewDto, IAllArtworkResponse } from "../../api/artworkApi";

export function StoreArtworksAction(
  artworks: IArtworkViewDto[],
  paging: IAllArtworkResponse["pagination"] | null
) {
  store.dispatch({ type: "STORE_ARTWORKS", payload: { artworks, paging } });
}
