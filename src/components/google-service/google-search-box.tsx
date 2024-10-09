// @ts-nocheck
import PropTypes from 'prop-types';
import React, { createRef } from 'react';

export default class SearchBox extends React.Component {
  inputRef = createRef<React.RefAttributes<HTMLInputElement>>();
  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func,
  };

  render() {
    return (
      <input
        ref={this.inputRef}
        {...this.props}
        type="text"
        placeholder="Change your location"
        className="md:w-[50%] w-full border-slate-500 p-3 border-2 rounded-lg focus:border-blue-500 absolute z-10 m-3"
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
