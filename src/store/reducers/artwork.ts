import { IArtworkViewDto } from "../../api/artworkApi";

type RootState = {
  artworks: IArtworkViewDto[]
}

const initialState: RootState = {
  artworks: []
}

export function artworkReducer(_: RootState, action: any) {
  switch (action.type) {
    case 'STORE_ARTWORKS':
      const newState = {artworks: action.payload}
      return newState
    default:
      return initialState
  }
}
