import React, { useRef, useState } from 'react'

const API_BASE_URL = 'http://localhost:5001' 
//zmena ked postneme 
export default function App() {
  const inputRef = useRef(null)

  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedName, setUploadedName] = useState('')
  const [uploadedSize, setUploadedSize] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  const openFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleUpload = async (event) => {
    const file = event.target.files && event.target.files[0]
    if (!file) return

    setError('')
    setIsUploading(true)
    setUploadedName(file.name)
    setUploadedSize(`${(file.size / 1024).toFixed(2)} KB`)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadedImage(data.image_url)
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setUploadedImage(null)
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  const handleDelete = () => {
    setUploadedImage(null)
    setUploadedName('')
    setUploadedSize('')
    setError('')
  }

  return (
    <div style={styles.appShell}>
      <header style={styles.topbar}>
        <div style={styles.topbarInner}>
          <div style={styles.brandWrap}>
            <div style={styles.brandMark}>
              <svg viewBox="0 0 48 48" fill="none" width="24" height="24">
                <rect
                  x="8"
                  y="10"
                  width="32"
                  height="22"
                  rx="7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <circle
                  cx="24"
                  cy="21"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M17 37h14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h1 style={styles.title}>Rakoo</h1>
              <p style={styles.subtitle}>
                Drop an image and findout if your image is real or deepfake
              </p>
            </div>
          </div>
        </div>
      </header>

      <main style={styles.page}>
        <section style={styles.card}>
          <div style={styles.buttonRow}>
            <button
              type="button"
              style={{ ...styles.ctaButton, ...styles.cameraButton }}
              onClick={openFileDialog}
            >
              Upload Image
            </button>
          </div>

          <div
            style={styles.uploadPanel}
            onClick={openFileDialog}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openFileDialog()
              }
            }}
          >
            <div style={styles.uploadIconBox}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                width="34"
                height="34"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M12 16V4" />
                <path d="M7 9l5-5 5 5" />
                <path d="M5 20h14" />
              </svg>
            </div>

            <h2 style={styles.uploadTitle}>Drag and drop your image here</h2>
            <p style={styles.uploadText}>Upload a photo to start</p>

            <span style={styles.browseButton}>
              {isUploading ? 'Uploading...' : 'Click to browse'}
            </span>

            <p style={styles.metaText}>Supported formats: jpg, jpeg, png, webp</p>
            <p style={styles.metaText}>Max file size: 5 MB</p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />

          {error && <p style={styles.errorText}>{error}</p>}
        </section>

        {uploadedImage && (
          <section style={styles.previewCard}>
            <div style={styles.previewHeader}>
              <h3 style={styles.previewTitle}>Uploaded Image</h3>
              <span style={styles.previewBadge}>{uploadedSize}</span>
            </div>

            <div style={styles.previewImageWrap}>
              <img
                src={uploadedImage}
                alt={uploadedName || 'Uploaded image'}
                style={styles.previewImage}
              />
            </div>

            <div style={styles.previewActions}>
              <button
                type="button"
                style={{ ...styles.actionButton, ...styles.detectButton }}
              >
                Check Image
              </button>

              <button
                type="button"
                style={{ ...styles.actionButton, ...styles.deleteButton }}
                onClick={handleDelete}
              >
                Delete Image
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

const styles = {
  appShell: {
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    color: '#1f2937',
    background: '#f3f7ff',
  },
  topbar: {
    background: 'linear-gradient(90deg, #2563eb 0%, #2f5bff 100%)',
    color: '#ffffff',
    padding: '18px 16px',
    boxShadow: '0 8px 24px rgba(37, 99, 235, 0.18)',
  },
  topbarInner: {
    maxWidth: '1180px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
  brandWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  brandMark: {
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.14)',
    border: '1px solid rgba(255,255,255,0.24)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 800,
  },
  subtitle: {
    margin: '4px 0 0',
    color: 'rgba(255,255,255,0.82)',
    fontSize: '14px',
  },
  page: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '34px 16px 64px',
  },
  card: {
    maxWidth: '760px',
    margin: '0 auto',
    background: '#ffffff',
    border: '1px solid #eef2ff',
    borderRadius: '24px',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
    padding: '24px',
  },
  buttonRow: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    marginBottom: '20px',
  },
  ctaButton: {
    minHeight: '56px',
    border: 'none',
    borderRadius: '14px',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
  },
  cameraButton: {
    background: 'linear-gradient(90deg, #2563eb, #2f6bff)',
  },
  uploadPanel: {
    border: '2px dashed #c7dcff',
    borderRadius: '20px',
    background: '#ffffff',
    minHeight: '320px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  },
  uploadIconBox: {
    width: '68px',
    height: '68px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(47,102,245,0.08), rgba(140,61,241,0.12))',
    color: '#44506c',
    marginBottom: '20px',
  },
  uploadTitle: {
    margin: 0,
    fontSize: '30px',
    fontWeight: 800,
    color: '#172554',
  },
  uploadText: {
    marginTop: '14px',
    marginBottom: '20px',
    maxWidth: '520px',
    color: '#64748b',
    fontSize: '16px',
    lineHeight: 1.6,
  },
  browseButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '46px',
    padding: '0 20px',
    borderRadius: '9999px',
    background: 'linear-gradient(90deg, #dbe7ff, #edf2ff)',
    color: '#2d5bdb',
    fontWeight: 700,
    marginBottom: '20px',
  },
  metaText: {
    margin: '4px 0',
    fontSize: '13px',
    color: '#7b87a3',
  },
  errorText: {
    color: '#dc2626',
    marginTop: '16px',
    textAlign: 'center',
    fontWeight: 600,
  },
  previewCard: {
    maxWidth: '920px',
    margin: '28px auto 0',
    background: '#ffffff',
    border: '1px solid #eef2ff',
    borderRadius: '24px',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
    padding: '18px',
  },
  previewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    gap: '12px',
  },
  previewTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 700,
    color: '#1f2937',
  },
  previewBadge: {
    fontSize: '13px',
    color: '#6b7280',
    background: '#f8fafc',
    padding: '8px 12px',
    borderRadius: '9999px',
  },
  previewImageWrap: {
    borderRadius: '18px',
    background: '#f8fbff',
    padding: '16px',
    minHeight: '340px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '380px',
    objectFit: 'contain',
    borderRadius: '12px',
  },
  previewActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginTop: '22px',
  },
  actionButton: {
    minHeight: '52px',
    padding: '0 24px',
    border: 'none',
    borderRadius: '14px',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
  },
  detectButton: {
    background: 'linear-gradient(90deg, #2563eb, #2f6bff)',
  },
  deleteButton: {
    background: 'linear-gradient(90deg, #ef4444, #dc2626)',
  },
}