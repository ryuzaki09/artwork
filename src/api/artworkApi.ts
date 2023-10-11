import axios from 'axios'

interface IArtworkResponse {
  config: {
    iiif_url: string
    website_url: string
  }
}

interface IAllArtworkResponse extends IArtworkResponse {
  data: IArtworkResponseDto[]
}

interface IOneArtworkResponse extends IArtworkResponse {
  data: IArtworkResponseDto
}

export interface IArtworkResponseDto {
  id: number
  artist_display: string
  artist_title: string
  category_ids: string[]
  copyright_notice: string
  credit_line: string
  image_id: string
  place_of_origin: string
  title: string
}

const artworkClient = axios.create({
  baseURL: 'https://api.artic.edu/api/v1'
})

export const artworkApi = {
  async getAll() {
    const {data} = await artworkClient.get<IAllArtworkResponse>('/artworks')

    return data ? transformResponseDtoToViewDto(data.data, data.config) : []
  },

  async getById(id: number) {
    const {data} = await artworkClient.get<IOneArtworkResponse>(
      `/artworks/${id}`
    )

    return data ? transformResponseDtoToViewDto([data.data], data.config) : []
  }
}

export interface IArtworkViewDto {
  id: number
  imageId: string
  artistDisplay: string
  artistTitle: string
  categoryIds: string[]
  copyright: string
  credits: string
  iiifUrl: string
  origin: string
  title: string
}

function transformResponseDtoToViewDto(
  responseDto: IArtworkResponseDto[],
  config: IArtworkResponse['config']
): IArtworkViewDto[] {
  return responseDto.map((r) => ({
    id: r.id,
    imageId: r.image_id,
    artistDisplay: r.artist_display,
    artistTitle: r.artist_title,
    categoryIds: r.category_ids,
    copyright: r.copyright_notice,
    credits: r.credit_line,
    iiifUrl: config.iiif_url,
    origin: r.place_of_origin,
    title: r.title
  }))
}
