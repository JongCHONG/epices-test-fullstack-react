import React, { useRef, useState } from "react";

import CsvUploadModalStyles from "./CsvUploadModal.module.scss";

import { apiUrl } from "../../constants/api";

interface CsvUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
}

const CsvUploadModal: React.FC<CsvUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Veuillez sélectionner un fichier CSV.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/productions/import`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        setError(
          "L'envoi a échoué. Veuillez réessayer avec un fichier CSV valide."
        );
        setLoading(false);
        return;
      }
      setLoading(false);
      onUploadSuccess && onUploadSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={CsvUploadModalStyles.overlay}>
      <div className={CsvUploadModalStyles.modal}>
        <button className={CsvUploadModalStyles.close} onClick={onClose}>
          ×
        </button>
        <h2>Importer un fichier CSV</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            disabled={loading}
          />
          {error && <div className={CsvUploadModalStyles.error}>{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CsvUploadModal;
