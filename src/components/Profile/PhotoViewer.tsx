import { useEffect, useState } from 'react'

type PhotoViewerProps = {
  images: string[]
  initialIndex: number
  onClose: () => void
}

function PhotoViewer({
  images,
  initialIndex,
  onClose,
}: PhotoViewerProps) {
  const [currentIndex, setCurrentIndex] =
    useState(initialIndex)

  const [showControls, setShowControls] =
    useState(true)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Close with Escape
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'ArrowLeft') {
        goPrevious()
      }

      if (event.key === 'ArrowRight') {
        goNext()
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  })

  // Hide controls after the cursor stops moving
  useEffect(() => {
    setShowControls(true)

    const timeout = setTimeout(() => {
      setShowControls(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [currentIndex])

  const goPrevious = () => {
    setCurrentIndex((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    )
  }

  const goNext = () => {
    setCurrentIndex((current) =>
      current === images.length - 1
        ? 0
        : current + 1
    )
  }

  const handleMouseMove = () => {
    setShowControls(true)
  }

  return (
    <div
      className="photo-viewer-overlay"
      onMouseMove={handleMouseMove}
    >
      <div className="photo-viewer">

        {/* CLOSE */}

        <button
          className={`photo-viewer-close ${
            showControls
              ? 'photo-controls-visible'
              : ''
          }`}
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          ×
        </button>

        {/* IMAGE */}

        <img
          src={images[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          className="photo-viewer-image"
        />

        {/* CONTROLS */}

        <div
          className={`photo-viewer-controls ${
            showControls
              ? 'photo-controls-visible'
              : ''
          }`}
        >
          <button
            onClick={goPrevious}
            className="photo-nav-button"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <span className="photo-counter">
            {currentIndex + 1} / {images.length}
          </span>

          <button
            onClick={goNext}
            className="photo-nav-button"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>

      </div>
    </div>
  )
}

export default PhotoViewer