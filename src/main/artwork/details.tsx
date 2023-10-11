import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

import {artworkApi, IArtworkViewDto} from '../../api/artworkApi'

import styles from './details.module.css'

export function ArtworkDetail() {
  const {artworks} = useSelector(({artwork}) => artwork)
  const {id: artworkId} = useParams()
  const [artwork, setArtwork] = useState<IArtworkViewDto | null>(null)


  const getFromStore = () => {
    const foundArtwork = artworks.find((a: any) => a.id === +artworkId!)
    if (foundArtwork) {
      setArtwork(foundArtwork)
    }
  }

  const fetchFromApi = async () => {
    if (artworkId) {
      const [art] = await artworkApi.getById(+artworkId)
      if (art) {
        setArtwork(art)
      }
    }
  }

  if (artworks.length > 0 && artworkId && !artwork) {
    getFromStore()
  }

  if (!artworks.length && artworkId && !artwork) {
    fetchFromApi()
  }

  return (
    <div>
      <h2>Artwork Details</h2>
      {artwork && (
        <div>
          <Header artwork={artwork} />
          <img
            src={`${artwork.iiifUrl}/${artwork.imageId}/full/400,/0/default.jpg`}
          />
          <Details artwork={artwork} />
        </div>
      )}
    </div>
  )
}

function Header({artwork}: {artwork: IArtworkViewDto}) {
  return (
    <div className={styles.header}>
      <h3>{artwork.title}</h3>
      <div><strong>Origin: </strong>{artwork.origin}</div>
      <div><strong>Artist: </strong>{artwork.artistTitle}</div>
    </div>
  )
}

function Details({artwork}: {artwork: IArtworkViewDto}) {
  return (
    <div className={styles.header}>
      <p>{artwork.artistDisplay}</p>
      <div><strong>Credits: </strong>{artwork.credits}</div>
      <p>{artwork.copyright}</p>
    </div>
  )
}
