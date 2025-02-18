import { useRef, useState, type PropsWithChildren } from 'react';
import styles from './FilePicker.module.scss';

interface FilePickerProps extends PropsWithChildren {
  name: string;
  id: string;
  onSelect: (files: FileList | null) => void;
}

export function FilePicker({ name, id, onSelect }: FilePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  function handleOnSlelect(event: React.ChangeEvent<HTMLInputElement>) {
    onSelect(event.target.files);

    const selectedFiles = Array.from(event.target.files || []);

    setSelectedFiles(selectedFiles);
  }

  return (
    <div className={styles.FilePicker}>
      <button
        className={styles.FilePicker__button}
        aria-labelledby={id}
        onClick={() => inputRef.current?.click()}>
        Upload
      </button>
      <input
        ref={inputRef}
        className={styles.FilePicker__input}
        aria-label="Upload"
        type="file"
        name={name}
        id={id}
        onChange={handleOnSlelect}
        multiple
      />
      <div className={styles.FilePicker__previewGrid}>
        {selectedFiles.map((file) => (
          <img
            className={styles.FilePicker__preview}
            key={file.name}
            src={URL.createObjectURL(file)}
            alt={file.name}
          />
        ))}
      </div>
    </div>
  );
}
