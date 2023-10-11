import { IArtworkViewDto, IAllArtworkResponse } from "../../api/artworkApi";

type RootState = {
  artworks: IArtworkViewDto[]
  paging: IAllArtworkResponse["pagination"] | null
}

const initialState: RootState = {
  artworks: [],
  paging: null
}

export function artworkReducer(_: RootState, action: any) {
  switch (action.type) {
    case 'STORE_ARTWORKS':
      const newState = {artworks: action.payload.artworks, paging: action.payload.paging}
      return newState
    default:
      return initialState
  }
}
