import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {artworkApi, IArtworkViewDto } from '../../api/artworkApi'
import {StoreArtworksAction} from '../../store/actions/artwork'

import styles from './index.module.css'

export function Artwork() {
  const [allArtwork, setAllArtwork] = useState<IArtworkViewDto[]>([])

  useEffect(() => {
    const fetchArtwork = async () => {
      const result = await artworkApi.getAll()

      setAllArtwork(result)
      StoreArtworksAction(result)
    }

    fetchArtwork()
  }, [])

  return (
    <>
      {allArtwork.length > 0 &&
        allArtwork.map((artwork: IArtworkViewDto) => (
          <Art art={artwork} key={artwork.id} />
        ))}
    </>
  )
}

function Art({art}: {art: IArtworkViewDto}) {
  const navigate = useNavigate()

  const handleViewDetails = (id: number) => {
    navigate(`/artwork/${id}`)
  }

  return (
    <div className={styles.artworkWrapper}>
      <h4 className={styles.artistDisplay}>{art.artistDisplay}</h4>
      <img
        src={`${art.iiifUrl}/${art.imageId}/full/400,/0/default.jpg`}
      />
      <button onClick={() => handleViewDetails(art.id)}>View details</button>
    </div>
  )
}
