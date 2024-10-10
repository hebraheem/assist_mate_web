/*global google*/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { useI18n } from '../../services/languages/i18fn';

interface SearchBoxProps {
  placeholder?: string;
  onPlacesChanged?: (places: google.maps.places.PlaceResult[]) => void;
  inputClass?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, onPlacesChanged, inputClass = '' }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const i18n = useI18n();

  const handlePlacesChanged = () => {
    if (onPlacesChanged && searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      onPlacesChanged(places);
    }
  };

  useEffect(
    () => {
      const input = inputRef.current;

      if (input) {
        searchBoxRef.current = new google.maps.places.SearchBox(input);
        searchBoxRef.current.addListener('places_changed', handlePlacesChanged);
      }

      return () => {
        if (searchBoxRef.current) {
          google.maps.event.clearInstanceListeners(searchBoxRef.current);
        }
      };
    },
    // eslint-disable-next-line
    []
  );

  return (
    <input
      ref={inputRef}
      type="search"
      placeholder={i18n.msg(placeholder ?? 'CHANGE_CURRENT_LOCATION')}
      className={`md:w-[50%] w-full border-slate-300 p-2 border-2 rounded-lg focus:border-blue-500 ${inputClass}`}
    />
  );
};

// PropTypes for type checking
SearchBox.propTypes = {
  placeholder: PropTypes.string,
  onPlacesChanged: PropTypes.func,
  inputClass: PropTypes.string,
};

export default SearchBox;

// import PropTypes from 'prop-types';
// import React, { createRef } from 'react';

// export default class SearchBox extends React.Component {
//   inputRef = createRef<React.RefAttributes<HTMLInputElement>>();
//   static propTypes = {
//     placeholder: PropTypes.string,
//     onPlacesChanged: PropTypes.func,
//     inputClass: PropTypes.string,
//   };

//   render() {
//     return (
//       <input
//         ref={this.inputRef}
//         {...this.props}
//         type="search"
//         placeholder="Change your location"
//         className={`md:w-[50%] w-full border-slate-300 p-3 border-2 rounded-lg focus:border-blue-500 ${this.props.inputClass ?? ''}`}
//       />
//     );
//   }

//   onPlacesChanged = () => {
//     if (this.props.onPlacesChanged) {
//       this.props.onPlacesChanged(this.searchBox.getPlaces());
//     }
//   };

//   componentDidMount() {
//     const input = this.inputRef.current;
//     this.searchBox = new google.maps.places.SearchBox(input);
//     this.searchBox.addListener('places_changed', this.onPlacesChanged);
//   }

//   componentWillUnmount() {
//     // https://developers.google.com/maps/documentation/javascript/events#removing
//     google.maps.event.clearInstanceListeners(this.searchBox);
//   }
// }
