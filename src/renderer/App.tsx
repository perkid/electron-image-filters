import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import cat from '../../assets/cat.png';
import React, { Component, useState } from 'react';
import { Surface } from 'gl-react-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

import ImageFilters, { Constants } from 'react-native-gl-image-filters';

import Filter from './Filter';
import './App.css';
import fs from "fs";

const Hello = () => {
  const SURFACE_SIZE = 300;
  const [settings, setSettings] = useState([
    {
      name: 'hue',
      minValue: -100.0,
      maxValue: 100.0,
    },
    {
      name: 'blur',
      maxValue: 6.0,
    },
    {
      name: 'sepia',
      maxValue: 2.0,
    },
    {
      name: 'sharpen',
      maxValue: 2.0,
    },
    {
      name: 'negative',
      maxValue: 2.0,
    },
    {
      name: 'contrast',
      maxValue: 2.0,
    },
    {
      name: 'saturation',
      maxValue: 2.0,
    },
    {
      name: 'brightness',
      maxValue: 2.0,
    },
    {
      name: 'temperature',
      minValue: 1000.0,
      maxValue: 40000.0,
    },
    {
      name: 'exposure',
      step: 0.05,
      minValue: -1.0,
      maxValue: 1.0,
    },
    {
      component: 'Spacer',
    },
    {
      name: 'colorOverlay',
      component: 'ColorPicker',
    }
  ])
  //@ts-ignore
  const [values, setValues] = useState(Constants.DefaultValues);

  const saveImage = () => {
    //@ts-ignore
    if (!this.image) return;
    //@ts-ignore
    const result = this.image.captureAsDataURL()
    console.warn(result);
  };

  const resetImage = () => {
    //@ts-ignore
    setValues(Constants.DefaultValues);
  }
  
  return (
    <div className="Hello">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Image Filters
          </Typography>
        </Toolbar>
      </AppBar>
      <header className="App-header">
        <Surface
          // @ts-ignore
          ref={ref => (this.image = ref)}
          width={SURFACE_SIZE}
          height={SURFACE_SIZE}
          webglContextAttributes={{preserveDrawingBuffer: true}}
        >
          <ImageFilters
            {...values}
            width={SURFACE_SIZE}
            height={SURFACE_SIZE}
          >
            https://i.imgur.com/5EOyTDQ.jpg
            {/* {cat} */}
          </ImageFilters>
        </Surface>
      </header>
      {settings.map((filter, index) => (
        <Filter
          key={index}
          name={filter.name}
          value={values[filter.name]}
          defaultValue={values[filter.name]}
          minimum={filter.minValue}
          maximum={filter.maxValue}
          step={filter.step}
          component={filter.component}
          //@ts-ignore
          onChange={value => setValues({...values, [filter.name]: value})}
        />
      ))}
      <Button
        className="App-button"
        variant="contained"
        color="primary"
        onClick={()=>saveImage()}
      >
        Save
      </Button>
      <Button
        className="App-button"
        variant="contained"
        color="primary"
        onClick={()=>resetImage()}
      >
        Reset
      </Button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
