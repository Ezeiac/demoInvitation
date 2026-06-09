'use client';
import { useState, useEffect, useRef } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';

export default function MapComponent() {
  const [userLocation, setUserLocation] = useState<{ lng: number, lat: number } | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      (error) => console.error("Error GPS:", error.message),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        duration: 2500,
        zoom: 12,
        essential: true
      });
    }
  }, [userLocation]);

  if (typeof window === 'undefined') return null;

  return (
    <div className="w-full h-[500px] relative">
      {!userLocation && (
        <div className="absolute inset-0 z-10 flex items-end justify-center bg-[#111117]/20 text-green-500 font-bold text-[24px]">
          Localizando tu invitación...
        </div>
      )}

      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        ref={mapRef}

        initialViewState={{
          longitude: -64.26847,
          latitude: -31.39370,
          zoom: 12
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >

        {userLocation && (

          <Marker
            longitude={userLocation.lng}
            latitude={userLocation.lat}
            anchor="bottom" // Obligatorio para iconos con punta
          >
            {/* El secreto es que este DIV no tenga paddings ni line-heights extraños */}
            <div className="flex flex-col items-center justify-end" style={{ width: '40px', height: '40px' }}>

              {/* Cartelito */}
              <div className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-md border border-gray-200 mb-[-2px] whitespace-nowrap">
                FIESTA 🎉
              </div>

              {/* SVG de Pin: La punta está EXACTAMENTE en el borde inferior del SVG */}
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                className="drop-shadow-sm"
              >
                <path
                  fill="#ef4444"
                  stroke="white"
                  strokeWidth="1.5"
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                />
                <circle cx="12" cy="9" r="2.5" fill="white" />
              </svg>
            </div>
          </Marker>


        )}

        <Marker longitude={-64.26847} latitude={-31.39370} anchor="top">
          <div className="flex flex-col items-center">
            <span className="bg-white text-black px-2 py-1 rounded-md text-xs font-bold shadow-lg mb-1">
              Fiesta 🎉
            </span>
            <div className="text-4xl">📍</div>
          </div>
        </Marker>

        {/* Punto de Destino 2: La Ceremonia (ejemplo) */}
        <Marker longitude={-64.27000} latitude={-31.40000} anchor="top">
          <div className="text-4xl">⛪</div>
        </Marker>
      </Map>
    </div >
  );
}