import React, { useContext, useEffect, useState } from 'react';
import { render } from 'react-dom';
import App from './app';
import TeamStore from './stores/team-store';

render(<App />, document.getElementById('root'));