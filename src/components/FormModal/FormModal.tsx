import React, { useRef, useState } from "react";
import FormModalStyles from "./FormModal.module.scss";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
}

const FormModal: React.FC<FormModalProps> = ({
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
      const res = await fetch("http://localhost:80/productions/import", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi du fichier.");
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
    <div className={FormModalStyles.overlay}>
      <div className={FormModalStyles.modal}>
        <button className={FormModalStyles.close} onClick={onClose}>
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
          {error && <div className={FormModalStyles.error}>{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
