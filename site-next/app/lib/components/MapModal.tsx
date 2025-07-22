import React, { useState, useCallback } from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';

const YANDEX_MAP_API_KEY = '7e543b8e-d5d8-4b9c-9389-bf58e8c9af88';

const DEFAULT_CENTER: [number, number] = [55.751574, 37.573856];

type MapModalProps = {
  onClose: () => void;
  onSelect: (address: string, coords: [number, number]) => void;
};

const MapModal: React.FC<MapModalProps> = React.memo(({ onClose, onSelect }) => {
  const [searchValue, setSearchValue] = useState('');
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapCoords, setMapCoords] = useState<[number, number] | null>(null);

  const handleSearch = useCallback(async () => {
    if (!searchValue) return;
    const res = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_MAP_API_KEY}&format=json&geocode=${encodeURIComponent(searchValue)}`
    );
    const data = await res.json();
    const features = data.response.GeoObjectCollection.featureMember;
    if (!features.length) {
      alert('Адрес не найден');
      return;
    }
    const geoObj = features[0].GeoObject;
    const pos = geoObj.Point.pos.split(' ').map(Number);
    const coords: [number, number] = [parseFloat(pos[1]), parseFloat(pos[0])];
    setMapCenter(coords);
    setMapCoords(coords);
  }, [searchValue]);

  const handleMapClick = useCallback(async (e: any) => {
    const coords = e.get('coords');
    setMapCoords(coords);
    // Reverse geocode
    const res = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_MAP_API_KEY}&format=json&geocode=${coords[1]},${coords[0]}`
    );
    const data = await res.json();
    const address =
      data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text || '';
    onSelect(address, coords);
    onClose();
  }, [onSelect, onClose]);

  const handleClose = useCallback(() => {
    setSearchValue('');
    setMapCoords(null);
    setMapCenter(DEFAULT_CENTER);
    onClose();
  }, [onClose]);

  return (
    <div
      style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={handleClose}
    >
      <div
        style={{ background: '#fff', padding: 16, borderRadius: 12, maxWidth: 700, width: '100%', minHeight: 400, position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <button className='btn-close' style={{ position: 'absolute', right: 16, top: 16, zIndex: 10, background: 'none', border: 'none' }} onClick={handleClose} aria-label='Закрыть'></button>
        <h4 style={{ marginBottom: 16, textAlign: 'center' }}>Укажите адрес доставки</h4>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            type='text'
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder='Введите адрес или место'
            className='form-control'
            style={{ flex: 1 }}
          />
          <button onClick={handleSearch} className='btn btn-dark'>Найти</button>
        </div>
        <YMaps query={{ apikey: YANDEX_MAP_API_KEY }}>
          <Map
            state={{ center: mapCenter, zoom: 12 }}
            width="100%"
            height="350px"
            onClick={handleMapClick}
          >
            <GeolocationControl options={{ float: 'right' }} />
            {mapCoords && <Placemark geometry={mapCoords} />}
          </Map>
        </YMaps>
      </div>
    </div>
  );
});

export default MapModal; 