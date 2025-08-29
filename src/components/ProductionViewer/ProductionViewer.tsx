import React, { useState, useEffect, useMemo } from 'react';
import ProductionViewerSyles from './ProductionViewer.module.scss';
import Button from '../Button/Button';

const ProductionViewer: React.FC = () => {
  const [date, setDate] = useState<string>("2025-07-10");
  const [total, setTotal] = useState<number | null>(null);
  const [hourlyData, setHourlyData] = useState<{hour: number; energy: number; inverter: string;}[]>([]);
  const [selectedInverter, setSelectedInverter] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:80/productions/daily/${date}`)
      .then(res => res.json())
      .then(data => {
        setTotal(data.total_energy);
        setHourlyData(data.hourly_productions);
      });
  }, [date]);

  const groupedByInverter = useMemo(() => {
    return (hourlyData ?? []).reduce((acc, curr) => {
      const inv = curr.inverter || 'Inconnu';
      if (!acc[inv]) acc[inv] = [];
      acc[inv].push(curr);
      return acc;
    }, {} as Record<string, {hour: number; energy: number; inverter: string}[]>);
  }, [hourlyData]);

  // Met à jour l'onglet sélectionné si besoin
  useEffect(() => {
    const inverters = Object.keys(groupedByInverter);
    if (inverters.length > 0 && (selectedInverter === null || !inverters.includes(selectedInverter))) {
      setSelectedInverter(inverters[0]);
    }
  }, [groupedByInverter, selectedInverter]);

  const inverters = Object.keys(groupedByInverter).sort();

  return (
    <div className={ProductionViewerSyles.container}>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <h2>Production totale : {total ?? 'Chargement...'}</h2>
      <h3>Production horaire :</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {inverters.map(inv => (
          <Button
            inv={inv}
            selectedInverter={selectedInverter || ''}
            setSelectedInverter={setSelectedInverter}
          />
          // <button
          //   key={inv}
          //   onClick={() => setSelectedInverter(inv)}
          //   style={{
          //     padding: '8px 16px',
          //     border: selectedInverter === inv ? '2px solid #007bff' : '1px solid #ccc',
          //     background: selectedInverter === inv ? '#e6f0ff' : '#fff',
          //     borderRadius: 4,
          //     cursor: 'pointer',
          //     fontWeight: selectedInverter === inv ? 'bold' : 'normal'
          //   }}
          // >
          //   Onduleur {inv}
          // </button>
        ))}
      </div>
      {selectedInverter && (
        <div>
          <ul>
            {groupedByInverter[selectedInverter].map(({ hour, energy }) => (
              <li key={hour}>{hour}h : {energy} kWh</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductionViewer;