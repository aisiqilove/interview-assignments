import { useState, useCallback, useRef, useEffect } from 'react';
import airpods from '../assets/airpods.png';
import iphone from '../assets/iphone.png';
import tablet from '../assets/tablet.png';
import './index.css';

interface imgList {
  title: string
  src: string
}

interface options {
  autoplay?: boolean
  direction?: 'horizontal' | 'vertical' | string
  currentIndex?: number
  duration?: number
  interval?: number
  defaultCurrent?: number
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

function Carousel({ imgList = defaultList, options = {}, className }: { imgList?: Array<imgList>, options?: options, className?: string }) {
  const { autoplay = true, direction = 'horizontal', duration = 300, interval = 2000, defaultCurrent = 0 } = options
  const [currentIndex, setCurrentIndex] = useState(defaultCurrent);
  const [animation, setAnimation] = useState(true);
  const [swiperItemList, setSwiperItemList] = useState(imgList);
  const swiperTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (imgList.length > 0) {
      const firstEle = imgList[0];
      const newList = [...swiperItemList, firstEle];
      setSwiperItemList(newList);
      document.documentElement.style.setProperty('--duration', `${interval/1000}s`);
      if(!autoplay) {
        document.documentElement.style.setProperty('--duration', `0s`);
      }
    }
  }, []);

  const swiperItemLength = swiperItemList.length;

  const swiperTo = useCallback(
    (index: number) => {
      setAnimation(true);
      setCurrentIndex(index);
    },
    [],
  );
  // 定时器
  const setTimer = useCallback(() => {
    if (autoplay && interval > 0) {
      swiperTimer.current = setTimeout(
        () => {
          swiperTo(currentIndex + 1);
        },
        currentIndex === 0 ? interval - (duration + 50) : interval,
      );
    }
  }, [autoplay, currentIndex, duration, interval, swiperTo]);

  const clearTimer = useCallback(() => {
    if (swiperTimer.current) {
      clearTimeout(swiperTimer.current);
      swiperTimer.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimer();
    setTimer();
  }, [clearTimer, setTimer]);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
      if (currentIndex + 1 >= swiperItemLength) {
        setCurrentIndex(0);
      }
    }, duration + 50);
  }, [currentIndex, swiperItemLength, duration, direction]);


  let wrapperStyle = {};
  if (direction === 'vertical') {
    wrapperStyle = {
      height: `${swiperItemLength * 100}%`,
      top: `-${currentIndex * 100}%`,
      transition: animation ? `top ${duration / 1000}s` : '',
    };
  } else {
    wrapperStyle = {
      width: `${swiperItemLength * 100}%`,
      left: `-${currentIndex * 100}%`,
      transition: animation ? `left ${duration / 1000}s` : '',
    };
  }
  return (
    <div className={`swiper ${className ? className : ''}`} >
      <div className={`swiper__content swiper--${direction}`} style={wrapperStyle}>
        {
          swiperItemList.map((item, index) => {
            return (
              <div className='swiper__content__item' key={index}>
                {item.title && <div className='swiper__content__item--title' >
                  <h2>{item.title}</h2>
                  <p>lorem ipsum</p>
                </div>}
                <img src={item.src} alt={item.title} />
              </div>
            )
          })
        }
      </div>
      <div className='swiper__bars'>
        {
          imgList.map((item, index) => {
            return (
              <div
                className={`swiper__bars__item ${currentIndex % imgList.length === index ? 'swiper__bars__item--active' : ''}`}
                key={index}
                onClick={() => swiperTo(index)}
              ></div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Carousel;
