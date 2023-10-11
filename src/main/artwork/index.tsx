import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  artworkApi,
  IArtworkViewDto,
  IAllArtworkResponse
} from "../../api/artworkApi";
import { StoreArtworksAction } from "../../store/actions/artwork";

import styles from "./index.module.css";

export function Artwork() {
  const [allArtwork, setAllArtwork] = useState<IArtworkViewDto[]>([]);
  const [pagination, setPagination] = useState<
    IAllArtworkResponse["pagination"] | null
  >(null);
  const fetchArtwork = async (pageUrl: string | null = null) => {
    const { data, paging } = await artworkApi.getAll(pageUrl);

    setAllArtwork(data);
    StoreArtworksAction(data);
    setPagination(paging);
  };

  useEffect(() => {
    fetchArtwork();
  }, []);

  const handlePreviousPage = () => {
    setAllArtwork([]);
    fetchArtwork(pagination?.prev_url);
  };
  const handleNextPage = () => {
    setAllArtwork([]);
    fetchArtwork(pagination?.next_url);
  };

  return (
    <div className={styles.container}>
      <h2>Artwork List</h2>
      {allArtwork.length > 0 &&
        allArtwork.map((artwork: IArtworkViewDto) => (
          <Art art={artwork} key={artwork.id} />
        ))}
      {pagination && (
        <div className={styles.pagingWrapper}>
          <p>Page {pagination.current_page}</p>
          <div>
            {pagination.prev_url && (
              <button className={styles.mainBtn} onClick={handlePreviousPage}>
                Previous
              </button>
            )}
            {pagination.next_url && (
              <button className={styles.mainBtn} onClick={handleNextPage}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Art({ art }: { art: IArtworkViewDto }) {
  const navigate = useNavigate();

  const handleViewDetails = (id: number) => {
    navigate(`/artwork/${id}`);
  };

  return (
    <div className={styles.artworkWrapper}>
      <h4 className={styles.artistDisplay}>{art.artistDisplay}</h4>
      <img src={`${art.iiifUrl}/${art.imageId}/full/400,/0/default.jpg`} />
      <button
        className={styles.mainBtn}
        onClick={() => handleViewDetails(art.id)}
      >
        View details
      </button>
    </div>
  );
}
