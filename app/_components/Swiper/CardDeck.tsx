import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

export default function SwiperCards({ children }: {
  children: ReactNode[]
}){
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        loop
        className="mySwiper"
      >
        {children.map((child, idx) => (<SwiperSlide key={idx}>{child}</SwiperSlide>))}
      </Swiper>
    </>
  );
}