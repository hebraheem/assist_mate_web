/*global google*/
import { useEffect, useRef, useState } from 'react';
import useUserLocation from '../../hooks/useUserLocation';
import SearchBox from './google-search-box';
import { GoogleMap } from '@react-google-maps/api';
import { LatLng, MapWithMarkers } from '../../@types/maps';
import { markersData } from '../../utils/mocks';
import { MAP_ID } from '../../utils/constant/map';
import { noUserImage } from '../../utils/constant';
import { TRAVEL_MODE } from '../../constants/enum';
import { TRAVEL_MODE_MAPPER } from '../../utils/methods/helpers';
import { useI18n } from '../../services/languages/i18fn';
import Button from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { privateUrls } from 'src/routes/urls';

const GeoMap = () => {
  const user = { hasImage: false, imageUrl: '' };
  const { latitude, longitude, error } = useUserLocation();
  const [center, setCenter] = useState<LatLng>();
  const [openSearchConfig, setOpenSearchConfig] = useState<boolean>(false);
  const [radius, setRadius] = useState<number | string>('');
  const mapRef = useRef<MapWithMarkers | null>(null);
  const [travelMode, seTravelMode] = useState<google.maps.TravelMode>(TRAVEL_MODE.WALKING);
  const i18n = useI18n();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (!center?.lat || !center?.lng || !mapRef?.current) return;
      createAdvancedMarker();
    },
    // eslint-disable-next-line
    [center, mapRef, travelMode, radius]
  );

  useEffect(
    () => {
      if (error) {
        alert(error);
      } else {
        setCenter({
          lat: latitude as number,
          lng: longitude as number,
        });
      }
    },
    // eslint-disable-next-line
    [error, latitude, longitude]
  );

  if (!center?.lat || !center?.lng) {
    return (
      <div className="w-full h-[45%] flex justify-center items-center">Loading map... Allow to get your location</div>
    );
  }

  // eslint-disable-next-line
  const getDistance = (origin: any, dest: any) => {
    const service = new google.maps.DistanceMatrixService();
    return service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [dest],
        travelMode: travelMode,
      },
      // eslint-disable-next-line
      (response: any, status: any) => {
        if (status === 'OK') {
          const element = response.rows[0].elements[0];

          if (element.status === 'OK') {
            return element;
          } else {
            console.error('Error fetching distance matrix:', element.status);
          }
        } else {
          console.error('Distance Matrix API error:', status);
        }
      }
    );
  };

  async function createAdvancedMarker() {
    // Request needed libraries.
    const { Map, InfoWindow } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    const map = new Map(document.getElementById('map-testing') as HTMLElement, {
      zoom: 12,
      center,
      mapId: MAP_ID,
    });

    // Create an info window to share between markers.
    const infoWindow = new InfoWindow();

    // Create the markers.
    markersData.forEach(({ lat, lng, user }) => {
      const pin = new PinElement({
        scale: 1,
        background: 'purple',
        borderColor: 'white',
        glyphColor: 'white',
        glyph: 'T',
      });
      const marker = new AdvancedMarkerElement({
        position: { lat, lng },
        map,
        title: user.fullName,
        content: pin.element,
        gmpClickable: true,
      });

      // Add a click listener for each marker, and set up the info window.
      marker.addListener('click', async ({ latLng }: { latLng: { lat: () => number; lng: () => number } }) => {
        const origin = { lat: latLng.lat(), lng: latLng.lng() };
        const distance = await getDistance(origin, center);
        infoWindow.close();
        infoWindow.setContent(
          `<div>
            <p class='font-medium text-xl'>${user.fullName}</p>
            <p class='font-medium'>${i18n.msg('LOCATION')}: ${distance.originAddresses[0]}</p>
            <p class='font-medium'>${i18n.msg('BY')}: ${TRAVEL_MODE_MAPPER(travelMode)}</p>
            <p class='font-bold'>${i18n.msg('DISTANCE')}: ${distance.rows[0].elements[0].distance.text}</p>
            <div class='flex justify-between items-center'>
            <p class='font-bold'>${i18n.msg('TIME')}: ${distance.rows[0].elements[0].duration.text} </p>
            <button id='profileButton' class='border-2 border-slate-400 rounded-lg p-1'>${i18n.msg('PROFILE')}</button>
            </div>
            </div>`
        );

        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          const btn = document.getElementById('profileButton');
          if (btn) {
            btn.addEventListener('click', () => {
              navigate(`${privateUrls.REQUEST}?user=${user.fullName}`);
            });
          }
        });
        infoWindow.open(marker.map, marker);
      });
    });

    const userImage = document.createElement('img');
    userImage.src = user?.hasImage ? user?.imageUrl : noUserImage;
    userImage.alt = 'current-user';
    userImage.classList.add('w-full', 'h-full', 'rounded-full', 'contain');
    const userPin = new PinElement({
      scale: 1,
      background: 'orange',
      glyph: userImage,
    });
    const draggable = new AdvancedMarkerElement({
      position: center,
      map,
      content: userPin.element,
      gmpClickable: false,
      gmpDraggable: true,
    });
    draggable.addListener('dragend', () => {
      const { lat, lng } = draggable.position as google.maps.LatLng;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setCenter({ lat, lng });
    });
  }

  return (
    <div
      style={{
        height: '45vh',
        width: '100%',
        borderRadius: 10,
        position: 'relative',
      }}
    >
      {!center?.lat || !center?.lng ? (
        <div>Loading map... Allow to get your location</div>
      ) : (
        <>
          <div className="flex justify-center">
            <SearchBox
              inputClass="absolute z-10 mt-12 w-[95%] p-2 mt-2 md:mt-2"
              onPlacesChanged={(values) => {
                const geo = values[0].geometry;
                if (geo) {
                  setCenter({
                    lat: geo.location?.lat() as number,
                    lng: geo.location?.lng() as number,
                  });
                }
              }}
            />
          </div>
          <GoogleMap
            id="map-testing"
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            mapTypeId="terrain"
            zoom={12}
            onLoad={(map) => {
              mapRef.current = map;
              createAdvancedMarker();
            }}
          />
          <div className="absolute bottom-1 left-1">
            <Button
              label={i18n.msg('FIND')}
              className="bg-slate-500 outline-none hover:bg-slate-400 text-sm text-white p-2 border-0"
              onClick={() => setOpenSearchConfig(!openSearchConfig)}
            />
          </div>
          {openSearchConfig && (
            <div className="flex gap-3 z-10 absolute justify-start px-3 flex-col shadow-lg bg-slate-50 border-2 p-3 max-w-[250px] rounded-lg">
              {/* <div className="flex justify-start items-center gap-3 bg-slate-50"> */}
              <div>
                <select
                  value={travelMode}
                  className="border-2 border-slate-300 focus:border-blue-500 p-2 rounded-lg w-full"
                  onChange={({ target }) => seTravelMode(target.value as google.maps.TravelMode)}
                >
                  {Object.keys(TRAVEL_MODE).map((mode) => (
                    <option value={mode} key={mode}>
                      {i18n.msg(mode)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="number"
                  min={0}
                  className="border-2 border-slate-300 focus:border-blue-500 p-2 rounded-lg w-full"
                  placeholder={i18n.msg('SEARCH_RADIUS_KM')}
                  value={radius}
                  onChange={({ target }) => setRadius(target.value)}
                />
              </div>
              {/* </div> */}
              {/* <Button
                className="p-2 bg-slate-500 text-sm text-white border-0 content"
                label={i18n.msg('REQUEST_HELP')}
                onClick={() => console.log('requesting...')}
              /> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GeoMap;
