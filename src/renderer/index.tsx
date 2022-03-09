import { render } from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

render(<App />, document.getElementById('root'));
serviceWorker.unregister();
