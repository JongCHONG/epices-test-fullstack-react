import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import ProductionViewerSyles from "./ProductionViewer.module.scss";
import InverterButton from "../InverterButton";
import FormModal from "../CsvUploadModal";

import { apiUrl } from "../../constants/api";

const ProductionViewer: React.FC = () => {
  const [date, setDate] = useState<string>("2025-07-10");
  const [total, setTotal] = useState<number | null>(null);
  const [hourlyData, setHourlyData] = useState<
    { hour: number; energy: number; inverter: string }[]
  >([]);
  const [selectedInverter, setSelectedInverter] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${apiUrl}/productions/daily/${date}`)
      .then((res) => res.json())
      .then((data) => {
        setTotal(data.total_energy);
        setHourlyData(data.hourly_productions);
      });
  }, [date]);

  const groupedByInverter = useMemo(() => {
    return (hourlyData ?? []).reduce((acc, curr) => {
      const inv = curr.inverter || "Inconnu";
      if (!acc[inv]) acc[inv] = [];
      acc[inv].push(curr);
      return acc;
    }, {} as Record<string, { hour: number; energy: number; inverter: string }[]>);
  }, [hourlyData]);

  useEffect(() => {
    const inverters = Object.keys(groupedByInverter);
    if (
      inverters.length > 0 &&
      (selectedInverter === null || !inverters.includes(selectedInverter))
    ) {
      setSelectedInverter(inverters[0]);
    }
  }, [groupedByInverter, selectedInverter]);

  const inverters = Object.keys(groupedByInverter).sort();

  return (
    <div className={ProductionViewerSyles.container}>
      <div className={ProductionViewerSyles.header}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className={ProductionViewerSyles.button}
          onClick={() => setShowModal(true)}
        >
          Importer CSV
        </button>
      </div>
      <h2>Production totale : {total ?? "Chargement..."}</h2>
      <h3>Production horaire :</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {inverters.map((inv) => (
          <InverterButton
            key={uuidv4()}
            inv={inv}
            selectedInverter={selectedInverter || ""}
            handleOnClick={setSelectedInverter}
          />
        ))}
      </div>
      {selectedInverter && (
        <div>
          <ul>
            {groupedByInverter[selectedInverter].map(({ hour, energy }) => (
              <li key={uuidv4()}>
                {hour}h : {energy} kWh
              </li>
            ))}
          </ul>
        </div>
      )}
      {showModal && (
        <FormModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProductionViewer;
