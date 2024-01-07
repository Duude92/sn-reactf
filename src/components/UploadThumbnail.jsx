import React from 'react'
import styles from './Styles/PostForm.module.css'

export default function UploadThumbnail(props) {
    return (
        <div className={styles.uploadedFileContainer}>
            <div className={styles.closeButton} />
            <img src={props.src} />
        </div>
    )
}
