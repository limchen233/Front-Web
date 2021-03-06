$(function(){
  // 获取当前所有item
  let items = $(".carousel-inner .item")

  // 监听屏幕的大小改变
  $(window).on('resize',function(){

    // 获取当前屏幕的宽度
    let width = $(window).width()

    // 判断屏幕的宽度
    if(width>=768){ // 说明是PC端
      // 为每一个item添加子元素--遍历
      $(items).each(function(index,value){
        let item = $(this)

        // 当前自定义属性中，存储的图片路径
        let imgSrc = item.data('largeImage')
        // console.log(imgSrc)

        // 添加PC端的子元素
        item.html($('<a href="javascript:;" class="pcImg"></a>').css("backgroundImage","url('"+imgSrc+"')"))
      })
    } else {//移动端
      $(items).each(function(index,value){
        let item = $(this)
        let imgSrc = item.data('smallImage')
        item.html('<a href="javascript:;" class="mobileImg"><img src="'+imgSrc+'"></a>')
      })
    }
  }).trigger('resize') // trigger()立即执行一次

  /*添加移动端的滑动操作*/
  let startX,endX;
  let carousel_inner=$(".carousel-inner")[0]

  /*获取当前轮播图*/
  let carousel=$(".carousel")

  carousel_inner.addEventListener("touchstart",function(e){
      startX= e.targetTouches[0].clientX
  });
  carousel_inner.addEventListener("touchend",function(e){
      endX= e.changedTouches[0].clientX
      if(endX-startX > 0){
          /*上一张*/
          carousel.carousel('prev')
      }
      else if(endX-startX < 0){
          /*下一张*/
          carousel.carousel('next')
      }
  });
})