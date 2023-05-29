import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel/Carousel';
import airpods from './assets/airpods.png';
import iphone from './assets/iphone.png';
import tablet from './assets/tablet.png';

describe('Carousel 组件测试', () => {
  test('create', () => {
    const { container } = render(<Carousel />);
    const swiperElement = container.querySelectorAll('.swiper');
    expect(swiperElement).toHaveLength(1);
  });

  test('btn event', () => {
    const options = { direction: 'horizontal' };
    const { container } = render(<Carousel imgList={[
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
    ]} options={options} />);
    
    expect(container.querySelectorAll('.swiper__content')[0].classList.contains(`swiper--${options.direction}`)).toBeTruthy();
    
    expect(container.querySelectorAll('.swiper__bars__item').length).toBe(3);
    const swiperBars = container.querySelectorAll('.swiper__bars__item');
    const swiperBarsItem = swiperBars[2];
    fireEvent.click(swiperBarsItem);
    expect(document.querySelectorAll('.swiper__bars__item')[2].classList.contains('swiper__bars__item--active')).toBeTruthy();

  });

})