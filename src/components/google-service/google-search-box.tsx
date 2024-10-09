/*global google*/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import PropTypes from 'prop-types';
import React, { createRef } from 'react';

export default class SearchBox extends React.Component {
  inputRef = createRef<React.RefAttributes<HTMLInputElement>>();
  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func,
    inputClass: PropTypes.string,
  };

  render() {
    return (
      <input
        ref={this.inputRef}
        {...this.props}
        type="search"
        placeholder="Change your location"
        className={`md:w-[50%] w-full border-slate-300 p-3 border-2 rounded-lg focus:border-blue-500 ${this.props.inputClass ?? ''}`}
      />
    );
  }

  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  };

  componentDidMount() {
    const input = this.inputRef.current;
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  componentWillUnmount() {
    // https://developers.google.com/maps/documentation/javascript/events#removing
    google.maps.event.clearInstanceListeners(this.searchBox);
  }
}
