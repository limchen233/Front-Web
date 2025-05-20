```vue
// 小程序中使用方法如下
<template>
  <view>
    <vue3-map @commitCheck="commitCheck" :mapKey="map.mapKey"></vue3-map>
  </view>
</template>

<script setup>
import {ref,reactive,getCurrentInstance} from 'vue'
import { newImgPre,mapKey } from '@/consts/consts.js'

const {proxy} = getCurrentInstance()
const eventChannel = proxy.getOpenerEventChannel();

const map = reactive(
  {
    mapKey:mapKey, //地图密钥
  }
)
const commitCheck = (data)=>{
  console.log('data:',data);
  eventChannel.emit('getLocationInfo', {
    location: data
  })
  uni.navigateBack()
}

</script>
```

