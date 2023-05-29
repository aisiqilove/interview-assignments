import './App.css';
import airpods from './assets/airpods.png';
import iphone from './assets/iphone.png';
import tablet from './assets/tablet.png';
import Carousel from './Carousel/Carousel';

interface imgList {
  title: string
  src: string
}

const defaultList: Array<imgList> = [
  {
    title: 'Airpods',
    src: airpods,
  },
  {
    title: 'Iphone',
    src: iphone,
  },
  {
    title: 'Tablet',
    src: tablet,
  }
]


function App() {
  return <div className='App'>{<Carousel imgList={defaultList} options={{
  }} />}</div>;
}

export default App;
