import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {WidgetContainer} from '../common/WidgetContainer'
import {BannerCarousel} from '../common/BannerCarousel'
import {useQuery} from 'react-query'
import {apiConfigs} from '../../apis/configs'
import {SkeletonLoader} from '../common/SkeletonLoader'
import {Nullable} from '../common/Nullable'
import {useCenterContext} from '../contextProviders/centerContext'

type ChecklistsProps = any

export const BannerCarouselWidget: React.FC<ChecklistsProps> = () => {
  const {selectedCenter} = useCenterContext()
  const {data: offerBanners = {}, isLoading: isOffersLoading} = useQuery({
    ...apiConfigs.getOfferBannersConfig(selectedCenter?.centerServiceId),
    enabled: !!selectedCenter?.centerServiceId,
    refetchOnMount: true,
    cacheTime: 0,
  })

  return (
    <Nullable
      dependencies={offerBanners}
      loading={isOffersLoading}
      loader={<SkeletonLoader length={1} />}
    >
      <WidgetContainer>
        <BannerCarousel banners={offerBanners} />
      </WidgetContainer>
    </Nullable>
  )
}

BannerCarouselWidget.defaultProps = {}
